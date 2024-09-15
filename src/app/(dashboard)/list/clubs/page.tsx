import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { clubData } from "@/lib/data";
import ClubCards from "@/components/ClubCards";
import FormModal from "@/components/FormModal";
type Club = {
  clubId: number;
  clubName: string;
  clubLogo: string;
  description: string;
  department: string;
  coordinator: string;
};

const ClubsListPage = () => {
  const renderCard = (item: Club) => [
    <div
      key={item.clubId}
      className="border-r-3 border border-sky-200 rounded-xl bg-white  p-4 mt-5 flex flex-col gap-2 text-sm hover:bg-[#f5fcff] w-[400px] h-[400px]"
    >
      <div className="w-100  flex justify-start h-50 ">
        {" "}
        <Image src={item.clubLogo} alt="" width={90} height={90}></Image>
      </div>
      <div className=" p-4">
        <h1 className="text-2xl font-bold">{item.clubName}</h1>
        <h2 className="text-lg font-light">{item.description}</h2>
      </div>
      <div className="flex p-2 flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Image src="/teacher.png" alt="" width={25} height={25}></Image>
          <p className="font-medium">{item.coordinator}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Image src="/class.png" alt="" width={25} height={25}></Image>
          <p className="font-medium">{item.department}</p>
        </div>
      </div>
      <hr className="bg-black" />
      <div className="flex justify-end gap-5 mt-5">
        <FormModal comp="club" type="update" data={item}></FormModal>
        <FormModal comp="club" type="delete" id={item.clubId}></FormModal>
        {/* <button className=" flex bg-[#ff746c] p-3 font-medium gap-2 rounded-md text-white w-[130px] items-center justify-center">
          <Image src="/delete.png" alt="" width={20} height={20}></Image>
          <p>Delete</p>
        </button> */}
      </div>
    </div>,
  ];
  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Clubs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch></TableSearch>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/filter.png" alt="" width={14} height={14}></Image>
            </button>
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/sort.png" alt="" width={14} height={14}></Image>
            </button>
            <FormModal comp="club" type="create"></FormModal>
            {/* <button className="w-8 h-8 rounded-full items-center flex justify-center bg-[#C1E1C1]">
              <Image src="/plus.png" alt="" width={14} height={14}></Image>
            </button> */}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="flex flex-row">
        <ClubCards renderCard={renderCard} data={clubData} />
      </div>
      {/* Pagination */}

      <Pagination></Pagination>
    </div>
  );
};

export default ClubsListPage;
