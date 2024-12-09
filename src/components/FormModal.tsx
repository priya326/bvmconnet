import { useEffect, useState } from "react";
import SelectField from "@/components/SelectField"; // Assuming SelectField is located here
import { decrypt } from "../../utils/security";
import { useRouter } from "next/navigation";

// Types
type Department = {
  id: number;
  name: string;
};

type Faculty = {
  id: number;
  name: string;
};

type Club = {
  id: number;
  name: string;
  description: string;
  department: Department;
  faculty: Faculty;
};

type FormModalProps = {
  type: "create" | "update";
  data?: Club;
  id?: number;
  onAddClub?: (club: Club) => void;
};

const FormModal = ({ type, data, id, onAddClub }: FormModalProps) => {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | number>(
    ""
  );

  // Fetch departments from getDepartments API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://27.116.52.24:8050/getDepartments");
        const data = await response.json();
        setDepartments(data.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Fetch faculties based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      const fetchFaculties = async () => {
        try {
          const response = await fetch(
            `http://27.116.52.24:8050/searchUser?department=${selectedDepartment}`
          );
          const data = await response.json();
          setFaculties(data.data);
        } catch (error) {
          console.error("Failed to fetch faculties:", error);
        }
      };

      fetchFaculties();
    }
  }, [selectedDepartment]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newClub = {
      name: formData.get("clubName"),
      description: formData.get("clubDescription"),
      department: selectedDepartment,
      faculty: formData.get("facultyCoordinator"),
    };

    try {
      const response = await fetch(
        "http://27.116.52.24:8050/addClubCoordinator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored
          },
          body: JSON.stringify(newClub),
        }
      );

      if (response.ok) {
        const addedClub = await response.json();
        onAddClub?.(addedClub.data); // Update club list with new club
      } else {
        const errorData = await response.json();
        console.error("Failed to add club:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding club:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{type === "create" ? "Add New Club" : "Update Club"}</h1>

      {/* Club Name */}
      <div>
        <label htmlFor="clubName">Club Name</label>
        <input type="text" id="clubName" name="clubName" required />
      </div>

      {/* Club Description */}
      <div>
        <label htmlFor="clubDescription">Club Description</label>
        <textarea id="clubDescription" name="clubDescription" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormModal;
