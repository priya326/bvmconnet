"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import InputField from "../InputField";
import SelectField from "../SelectField";

const departmentOptions = [
  { value: "civil", label: "Civil Engineering" },
  { value: "computer", label: "Computer Engineering" },
  { value: "electronics", label: "Electronics Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "production", label: "Production Engineering" },
  { value: "e&c", label: "Electronics & Communication Engineering" },
  { value: "it", label: "Information Technology" },
];

const schema = z.object({
  clubName: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  department: z.string().min(1, { message: "Required" }),
  coordinator: z.string().optional(), // coordinator is optional
});

type Inputs = z.infer<typeof schema>;

const Club = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new club</h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between ">
        <InputField
          label="Name"
          name="clubName"
          defaultValue={data?.clubName}
          register={register}
          error={errors.clubName}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />

        <InputField
          label="Coordinator"
          name="coordinator"
          defaultValue={data?.coordinator}
          register={register}
          error={errors.coordinator}
        />
        <SelectField
          label="department"
          name="department"
          options={departmentOptions}
          register={register}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="clubLogo"
          >
            <Image src="/upload.png" alt="Upload" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="clubLogo"
            name="clubLogo"
            className="hidden"
            // Use `register` if you want to manage the file input with react-hook-form
            // {...register("clubLogo")}
          />
          {/* Uncomment and manage errors for the file input if needed */}
          {/* {errors.clubLogo && (
            <p className="text-xs text-red-400">
              {errors.clubLogo.message.toString()}
            </p>
          )} */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="w-[50%] bg-light p-2 rounded-md font-semibold">
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default Club;
