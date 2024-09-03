"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
// import Faculty from "./forms/faculty";
// import Club from "./forms/club";

const Faculty = dynamic(() => import("./forms/faculty"), {
  loading: () => <h1>Loading...</h1>,
});
const Club = dynamic(() => import("./forms/club"), {
  loading: () => <h1>Loading...</h1>,
});
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  faculty: (type, data) => <Faculty type={type} data={data}></Faculty>,
  club: (type, data) => <Club type={type} data={data}></Club>,
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
  const size = type === "create" ? "w-8 h-8" : "w-9 h-9";
  const bgColor =
    type === "create"
      ? "bg-[#C1E1C1]"
      : type === "update"
      ? "bg-[#b4a8ff]"
      : "bg-[#ff746c]";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Are you sure you want to delete this {comp}?
        </span>
        <button className="bg-red-700 text-white px-4 py-2 rounded-md w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[comp](type, data)
    ) : (
      "form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16}></Image>
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-5 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {" "}
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14}></Image>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
