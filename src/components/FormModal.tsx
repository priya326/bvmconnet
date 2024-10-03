import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { addClub } from "../lib/api_urls";

interface ClubFormData {
  name: string;
  description: string;
  department_id: number;
  coordinator_id: number;
}

const Faculty = dynamic(() => import("./forms/faculty"), {
  loading: () => <h1>Loading...</h1>,
});
const Club = dynamic(() => import("./forms/club"), {
  loading: () => <h1>Loading...</h1>,
});

const forms = {
  // faculty: (type: string, data: any, onSubmit: (formData: any) => void) => (
  //   <Faculty type={type} data={data} onSubmit={onSubmit} />
  // ),
  club: (
    type: string,
    data: any,
    onSubmit: (formData: ClubFormData) => void
  ) => <Club type={type} data={data} onSubmit={onSubmit} />,
};

const FormModal = ({
  comp,
  type,
  data,
  id,
}: {
  comp: "faculty" | "club";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const [open, setOpen] = useState(false);

  // Handle club creation
  const handleCreate = async (formData: ClubFormData) => {
    try {
      await axios.post(addClub, formData);
      alert("Club added successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error creating club");
    }
  };

  // Handle club update
  const handleUpdate = async (formData: ClubFormData) => {
    try {
      await axios.put(`/api/${comp}/update/${id}`, formData);
      alert("Club updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error updating club");
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {comp}?
        </span>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md w-max self-center"
          onClick={() => setOpen(false)}
        >
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[comp](type, data, type === "create" ? handleCreate : handleUpdate)
    ) : (
      "form not found"
    );
  };

  return (
    <>
      <button
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          type === "create"
            ? "bg-[#C1E1C1]"
            : type === "update"
            ? "bg-[#b4a8ff]"
            : "bg-[#ff746c]"
        }`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={`${type} icon`}
          width={16}
          height={16}
        />
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-5 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
