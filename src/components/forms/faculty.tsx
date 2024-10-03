"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { addClub } from "@/lib/api_urls"; // Adjust this to the appropriate API URL

// Define validation schema using Zod
const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email address" }),
  club: z.string().min(1, { message: "Required" }),
  dept: z.string().min(1, { message: "Required" }),
});

// Infer the types from the Zod schema
type FacultyFormData = z.infer<typeof schema>;

const Faculty = ({
  type,
  data,
  onSubmit,
}: {
  type: "create" | "update";
  data?: FacultyFormData;
  onSubmit: (formData: FacultyFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormData>({
    resolver: zodResolver(schema),
    defaultValues: data || { name: "", email: "", club: "", dept: "" },
  });

  // Handle form submission
  const submitForm = handleSubmit((formData) => {
    onSubmit(formData); // Pass data to parent component's onSubmit handler
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={submitForm}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Create a new faculty coordinator"
          : "Update Faculty Coordinator Details"}
      </h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Club"
          name="club"
          defaultValue={data?.club}
          register={register}
          error={errors?.club}
        />
        <InputField
          label="Department"
          name="dept"
          defaultValue={data?.dept}
          register={register}
          error={errors?.dept}
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="w-[50%] bg-light p-2 rounded-md font-semibold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default Faculty;
