import Image from "next/image";

const UserCards = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-light even:bg-sixth p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="rounded-full bg-white px-2 py-1 text-[10px] text-purple-700">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={15}></Image>
      </div>
      <div className="flex flex-col justify-start pt-3">
        <h1 className="text-2xl my-2 font-semibold">200</h1>
        <span className="text-sm font-medium text-gray-700">{type}</span>
      </div>
    </div>
  );
};

export default UserCards;
