import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { facultyData } from "@/lib/data";
import FormModal from "@/components/FormModal";
type Faculty = {
  FacultyId: number;
  name: string;
  email: string;
  club: string;
  dept: string;
};
const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden md:table-cell",
  },
  {
    header: "Club",
    accessor: "club",
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "dept",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const FacultyListPage = () => {
  const renderRow = (item: Faculty) => [
    <tr
      key={item.FacultyId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-3">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.club}</td>
      <td className="hidden md:table-cell">{item.dept}</td>
      <td>
        <div className="flex items-center gap-4">
          <FormModal comp="faculty" type="update" data={item}></FormModal>
          <FormModal
            comp="faculty"
            type="delete"
            id={item.FacultyId}
          ></FormModal>
          {/* <button className="rounded-full bg-[#ff746c] w-8 h-8 flex items-center justify-center">
            <Image src="/delete.png" alt="" width={16} height={16}></Image>
          </button> */}
        </div>
      </td>
    </tr>,
  ];
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Faculty Coordinators
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch></TableSearch>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/filter.png" alt="" width={14} height={14}></Image>
            </button>
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/sort.png" alt="" width={14} height={14}></Image>
            </button>
            <FormModal comp="faculty" type="create"></FormModal>
            {/* <button className="w-8 h-8 rounded-full items-center flex justify-center bg-[#C1E1C1]">
              <Image src="/plus.png" alt="" width={14} height={14}></Image>
            </button> */}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={facultyData}></Table>
      {/* Pagination */}

      <Pagination></Pagination>
    </div>
  );
};

export default FacultyListPage;
