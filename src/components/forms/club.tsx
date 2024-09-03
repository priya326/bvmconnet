"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import InputField from "../InputField";
const schema = z.object({
  clubName: z.string().min(1, { message: "Required" }),
  clubLogo: z.instanceof(File, { message: "Image is required" }),
  description: z.string().min(1, { message: "Required" }),
  department: z.string().min(1, { message: "Required" }),
  coordinator: z.string().min(1, { message: "Required" }).optional(),
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
          name="name"
          defaultValue={data?.clubName}
          register={register}
          error={errors?.clubName}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />

        <InputField
          label="Department"
          name="department"
          defaultValue={data?.department}
          register={register}
          error={errors?.department}
        />
        <InputField
          label="Coordinator"
          name="coordinator"
          defaultValue={data?.coordinator}
          register={register}
          error={errors?.coordinator}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="clubLogo"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="clubLogo"
            {...register("clubLogo")}
            className="hidden"
          />
          {errors.clubLogo?.message && (
            <p className="text-xs text-red-400">
              {errors.clubLogo.message.toString()}
            </p>
          )}
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
