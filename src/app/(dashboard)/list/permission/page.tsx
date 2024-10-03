import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { eventData } from "@/lib/data";
type Event = {
  eventId: number;
  name: string;
  club: string;
  date: string;
  letter?: boolean;
  permission?: boolean;
};
const columns = [
  {
    header: "Event Name",
    accessor: "name",
  },
  {
    header: "Club",
    accessor: "club",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Letter",
    accessor: "letter",
  },
  {
    header: "Action",
    accessor: "action",
  },
];
const PermissionListPage = () => {
  const renderRow = (item: Event) => [
    <tr
      key={item.eventId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF] gap-5"
    >
      <td className="flex items-center  justify-center gap-4 p-3">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center  justify-center">{item.club}</div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center  justify-center">{item.date}</div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          {item.letter ? (
            <button className="rounded-md bg-[#c1dce1]  flex justify-center items-center gap-2 font-medium p-2">
              <Image src="/download.png" alt="" width={25} height={25}></Image>
              Download
            </button>
          ) : (
            <p>Report not available</p>
          )}

          {/* <button className="rounded-full bg-[#ff746c] w-8 h-8 flex items-center justify-center">
            <Image src="/delete.png" alt="" width={16} height={16}></Image>
          </button> */}
        </div>
      </td>
      <td>
        <div className="flex items-center  justify-center gap-4">
          {item.permission ? (
            <div className="flex justify-center  gap-4">
              <button className="rounded-md bg-[#C1E1C1]  flex justify-center items-center gap-2 font-medium p-2">
                <Image src="/tick.png" alt="" width={15} height={15}></Image>
                Accept
              </button>
              <button className="rounded-md bg-[#f49595]  flex justify-center items-center gap-2 font-medium p-2">
                <Image src="/close.png" alt="" width={15} height={15}></Image>
                Reject
              </button>
            </div>
          ) : (
            <p>Permission Approved</p>
          )}

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
        <h1 className="hidden md:block text-lg font-semibold">Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch></TableSearch>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/filter.png" alt="" width={14} height={14}></Image>
            </button>
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/sort.png" alt="" width={14} height={14}></Image>
            </button>

            {/* <button className="w-8 h-8 rounded-full items-center flex justify-center bg-[#C1E1C1]">
              <Image src="/plus.png" alt="" width={14} height={14}></Image>
            </button> */}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={eventData}></Table>
      {/* Pagination */}

      <Pagination></Pagination>
    </div>
  );
};

export default PermissionListPage;
