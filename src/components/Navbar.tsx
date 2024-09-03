import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search bar */}
      <div className="hidden md:flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* Icons and users */}
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={25} height={25}></Image>
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center  text-xs rounded-full bg-blue-950 text-white">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm leading-3 font-medium"> ABC</span>
          <span className="text-[15px] text-gray-500 text-right"> Admin</span>
        </div>
        <Image
          src="/avatar.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
      </div>
    </div>
  );
};

export default Navbar;
