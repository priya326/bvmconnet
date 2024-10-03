import { useState } from "react";

interface ClubFormData {
  name: string;
  description: string;
  department_id: number;
  coordinator_id: number;
}

interface ClubProps {
  type: "create" | "update";
  data?: ClubFormData;
  onSubmit: (formData: ClubFormData) => void;
}

const Club = ({ type, data, onSubmit }: ClubProps) => {
  const [formData, setFormData] = useState<ClubFormData>(
    data || { name: "", description: "", department_id: 0, coordinator_id: 0 }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Calling the onSubmit function passed from parent
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Department ID:</label>
        <input
          type="number"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Coordinator ID:</label>
        <input
          type="number"
          name="coordinator_id"
          value={formData.coordinator_id}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Create Club" : "Update Club"}
      </button>
    </form>
  );
};

export default Club;
