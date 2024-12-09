"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decrypt } from "../../../../../utils/security";
import SelectField from "@/components/SelectField";
import { getClub, getDepartment } from "@/lib/api_urls";

interface Department {
  id: number;
  name: string;
}

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
}

interface Faculty {
  id: number;
  role: string;
  user: User;
}

interface Student {
  id: number;
  batch: string;
  user: User;
}

interface ClubData {
  name: string;
  description: string;
  department_id: number;
  coordinator_id: number;
  department: {
    name: string;
  };
  faculties: Faculty[];
  students: Student[];
}

const EditClubPage = ({ clubId }: { clubId: string }) => {
  const router = useRouter();
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ClubData>({
    name: "",
    description: "",
    department_id: 0,
    coordinator_id: 0,
    department: { name: "" },
    faculties: [],
    students: [],
  });

  const fetchUserToken = () => {
    const storedUserData =
      localStorage.getItem("usere") || localStorage.getItem("user");
    if (!storedUserData) return null;

    try {
      const decryptedData = decrypt(storedUserData);
      const userData =
        typeof decryptedData === "string"
          ? JSON.parse(decryptedData)
          : decryptedData;
      return userData.data?.token || null;
    } catch (error) {
      console.error("Error decrypting user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = fetchUserToken();

      if (!token) {
        alert("You need to log in.");
        setLoading(false);
        return;
      }

      try {
        const departmentResponse = await fetch(getDepartment, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (departmentResponse.ok) {
          const { data } = await departmentResponse.json();
          setDepartments(data || []);
        } else {
          console.error("Failed to fetch departments");
        }

        const clubResponse = await fetch(getClub(clubId), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (clubResponse.ok) {
          const clubData: ClubData = await clubResponse.json();
          setClubData(clubData);
        } else {
          console.error("Failed to fetch club details");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clubId]);

  // Update formData when clubData is fetched
  useEffect(() => {
    if (clubData) {
      setFormData({
        name: clubData.name,
        description: clubData.description,
        department_id: clubData.department_id,
        coordinator_id:
          clubData.faculties?.find(
            (faculty) => faculty.role === "club coordinator"
          )?.id || 0,
        department: clubData.department,
        faculties: clubData.faculties,
        students: clubData.students,
      });
      console.log(formData);
    }
  }, [clubData]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, department_id: parseInt(value, 10) });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = fetchUserToken();
    if (!token) return alert("You need to log in.");

    try {
      const response = await fetch(`/updateClub/${clubId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Club updated:", result);
        router.push("/list/clubs");
      } else {
        console.error("Failed to update the club");
      }
    } catch (error) {
      console.error("Error updating club:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Club</h1>
      {clubData ? (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500">Name</label>
            <input
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Description</label>
            <input
              type="text"
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <SelectField
              label="Department"
              name="department_id"
              options={departments.map((department) => ({
                value: department.id,
                label: department.name,
              }))}
              register={() => {}} // Adjust based on form handling
              onChange={handleSelectChange}
              value={formData.department_id} // Ensure selected value reflects formData
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Coordinator ID</label>
            <input
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              type="number"
              name="coordinator_id"
              value={formData.coordinator_id}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-secondary text-white p-2 rounded-md"
          >
            Update
          </button>
        </form>
      ) : (
        <p>No club data found.</p>
      )}
    </div>
  );
};

export default EditClubPage;
