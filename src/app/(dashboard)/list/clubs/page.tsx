"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import ClubCards from "@/components/ClubCards";
import FormModal from "@/components/FormModal";
import { useEffect, useState } from "react";
import { decrypt } from "../../../../../utils/security";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClubs } from "@/lib/api_urls";
import { getToken } from "../../../../../utils/auth";

type Faculty = {
  id: number;
  name: string; // Faculty's full name or another identifier
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

type Club = {
  id: number;
  name: string;
  description: string;
  department: {
    name: string;
  };
  faculties: Faculty[]; // Array of faculties
  faculty?: Faculty; // Optional single faculty member
};

const ClubsListPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      alert("You need to log in.");
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch(getClubs, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Fixed string template
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          console.log("Fetched Clubs Data:", data.data);
          setClubs(data.data);
        } else {
          console.error("Expected an array of clubs, got:", data.data);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch club list:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching the club list:", error);
    }
  };

  const addNewClub = (newClub: Club) => {
    setClubs((prevClubs) => [...prevClubs, newClub]); // Update state with new club
  };
  const filteredClubs = clubs.filter((club) =>
    [
      club.name,
      club.description,
      club.faculties
        ?.map(
          (faculty) => `${faculty.user.first_name} ${faculty.user.last_name}`
        )
        .join(" "),
    ].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderCard = (item: Club) => {
    console.log(item); // Log the item to debug its structure

    return (
      <div
        key={item.id}
        className="border-r-3 border border-sky-200 rounded-xl bg-white p-4 mt-5 flex flex-col gap-2 text-sm hover:bg-[#f5fcff] w-[400px] h-[400px]"
      >
        <div className="w-100 flex justify-start h-50">
          <Image src="/gfg.png" alt="" width={90} height={90} />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold uppercase">{item.name}</h1>
          <h2 className="text-lg font-light">{item.description}</h2>
        </div>
        <div className="flex p-2 flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Image src="/teacher.png" alt="" width={25} height={25} />
            {item.faculties && item.faculties.length > 0 ? (
              <p className="font-medium">
                {item.faculties[0]?.user.first_name || "Unknown"}{" "}
                {item.faculties[0]?.user.last_name || ""}
              </p>
            ) : (
              <p className="font-medium">No Faculty Assigned</p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <Image src="/class.png" alt="" width={25} height={25} />
            {item.department ? (
              <p className="font-medium capitalize">{item.department.name}</p>
            ) : (
              <p className="font-medium">No Department Assigned</p>
            )}
          </div>
        </div>
        <hr className="bg-black" />
        <div className="flex justify-end gap-5 mt-5"></div>
      </div>
    );
  };

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Clubs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4 self-end bg-secondary p-2 text-white rounded-md">
            {" "}
            <Link href={`/createclub`}>Add</Link>
          </div>
        </div>
      </div>
      {/* List */}
      <div className="flex flex-row">
        <ClubCards renderCard={renderCard} data={filteredClubs} />
      </div>
    </div>
  );
};

export default ClubsListPage;
