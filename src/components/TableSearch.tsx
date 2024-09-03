import Image from "next/image";
const TableSearch = () => {
  return (
    <div className="">
      {" "}
      <div className="w-full md:w-auto md:flex flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default TableSearch;
