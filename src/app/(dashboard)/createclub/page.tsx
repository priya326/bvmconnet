"use client"; // Ensures this component is client-side only
import { addClub, getDepartment } from "@/lib/api_urls";
import React, { useEffect, useState } from "react";
import { decrypt } from "../../../../utils/security";
import SelectField from "@/components/SelectField";
import { useRouter } from "next/navigation"; // Ensure useRouter is used in a client-only context

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

interface ClubProps {
  type: "create" | "update";
  data?: ClubFormData;
  onSubmit: (formData: ClubFormData) => void;
}

const ClubForm = ({ type, onSubmit }: ClubProps) => {
  const [formData, setFormData] = useState<ClubFormData>({
    name: "",
    description: "",
    department_id: 0,
    coordinator_id: 0,
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // This is safe to use now since we're in a client component

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
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

        if (!token) {
          alert("You need to log in.");
          return;
        }

        const response = await fetch(getDepartment, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          setDepartments(data || []);
        } else {
          alert("Failed to fetch departments. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred while fetching departments:", error);
        alert("An error occurred while fetching departments.");
      } finally {
        setLoading(false);
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

  // Handle form submission
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

      if (!token) {
        alert("You need to log in.");
        return;
      }

      const response = await fetch(addClub, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/list/clubs"); // Safe to use now
      } else {
        alert("Failed to create the club.");
      }
    } catch (error) {
      console.error("Error creating club:", error);
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
        />
      </div>
      <button type="submit" className="bg-secondary text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClubForm;
