"use client"; // Ensure this is a client-side component
import { editClub, getClubs, getDepartment } from "@/lib/api_urls"; // Assuming you have update and get URLs
import React, { useEffect, useState } from "react";
import { decrypt } from "../../../../utils/security";
import SelectField from "@/components/SelectField";
import { useRouter } from "next/router"; // For navigation

interface ClubFormData {
  name: string;
  description: string;
  department_id: number;
  coordinator_id: number;
}

interface Department {
  id: number;
  name: string;
}

const EditClubForm = ({ clubId }: { clubId: number }) => {
  const [formData, setFormData] = useState<ClubFormData>({
    name: "",
    description: "",
    department_id: 0,
    coordinator_id: 0,
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch club details on component mount
  useEffect(() => {
    const fetchClubDetails = async () => {
      const storedUserData =
        localStorage.getItem("usere") || localStorage.getItem("user");
      if (!storedUserData) {
        alert("You need to log in.");
        return;
      }

      let userData;
      try {
        const decryptedData = decrypt(storedUserData);
        userData =
          typeof decryptedData === "string"
            ? JSON.parse(decryptedData)
            : decryptedData;
      } catch {
        alert("Invalid user data. Please log in again.");
        return;
      }

      const token = userData.data?.token;

      try {
        // Fetching the club details
        const response = await fetch(`${getClubs}/${clubId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const club = await response.json();
          setFormData({
            name: club.name,
            description: club.description,
            department_id: club.department_id,
            coordinator_id: club.coordinator_id,
          });
        } else {
          alert("Failed to fetch club details.");
        }
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      const storedUserData =
        localStorage.getItem("usere") || localStorage.getItem("user");
      if (!storedUserData) {
        alert("You need to log in.");
        return;
      }

      const decryptedData = decrypt(storedUserData);
      const userData =
        typeof decryptedData === "string"
          ? JSON.parse(decryptedData)
          : decryptedData;
      const token = userData.data?.token;

      try {
        const response = await fetch(getDepartment, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDepartments(data.data || []);
        } else {
          alert("Failed to fetch departments.");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, department_id: parseInt(value, 10) });
  };

  // Handle form submission (updating the club)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserData =
      localStorage.getItem("usere") || localStorage.getItem("user");
    if (!storedUserData) {
      alert("You need to log in.");
      return;
    }

    try {
      const decryptedData = decrypt(storedUserData);
      const userData =
        typeof decryptedData === "string"
          ? JSON.parse(decryptedData)
          : decryptedData;
      const token = userData.data?.token;

      const response = await fetch(`${editClub}/${clubId}`, {
        method: "PUT", // or PATCH
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Club updated successfully!");
        router.push("/list/clubs"); // Navigate to the clubs list page after updating
      } else {
        alert("Failed to update the club.");
      }
    } catch (error) {
      console.error("Error updating club:", error);
    }
  };

  return (
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
        <textarea
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        {loading ? (
          <p>Loading departments...</p>
        ) : (
          <SelectField
            label="Department"
            name="department_id"
            options={departments.map((department) => ({
              value: department.id,
              label: department.name,
            }))}
            register={() => {}} // Adjust based on form handling
            onChange={handleSelectChange}
          />
        )}
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
      <button type="submit" className="bg-secondary text-white p-2 rounded-md">
        Update
      </button>
    </form>
  );
};

export default EditClubForm;
