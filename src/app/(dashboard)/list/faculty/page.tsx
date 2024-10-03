"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import { getClubs } from "@/lib/api_urls";
import { decrypt } from "../../../../../utils/security";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [Faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchData(); // Fetch data on mount
  }, []);

  const fetchData = async () => {
    const storedUserData =
      localStorage.getItem("usere") || localStorage.getItem("user");
    if (!storedUserData) {
      alert("You need to log in.");
      router.push("/sign-in");
      return;
    }

    let userData;
    try {
      const decryptedData = decrypt(storedUserData);
      userData =
        typeof decryptedData === "string"
          ? JSON.parse(decryptedData)
          : decryptedData;
    } catch (error) {
      alert("Invalid user data. Please log in again.");
      return;
    }

    const token = userData.data.token;
    if (!token) {
      alert("You need to log in.");
      router.push("/sign-in");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await fetch(getClubs, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          // Transform the response data to match the faculty structure
          const mappedFaculties = result.data.flatMap((club: any) =>
            club.faculties.map((faculty: any) => ({
              FacultyId: faculty.id,
              name: `${faculty.user.first_name} ${faculty.user.last_name}`,
              email: faculty.user.email,
              club: club.name,
              dept: club.department.name,
            }))
          );

          setFaculty(mappedFaculties); // Update state with faculty data
        } else {
          console.error("Expected an array of clubs, got:", result.data);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch club list:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching the club list:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const renderRow = (item: Faculty) => (
    <tr
      key={item.FacultyId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-3">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell uppercase">{item.club}</td>
      <td className="hidden md:table-cell">{item.dept}</td>
      <td>
        <div className="flex items-center gap-4">
          {/* Update modal for the faculty */}
          <FormModal comp="faculty" type="update" data={item}></FormModal>

          {/* Delete modal for the faculty */}
          <FormModal
            comp="faculty"
            type="delete"
            id={item.FacultyId}
          ></FormModal>
        </div>
      </td>
    </tr>
  );

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
          </div>
        </div>
      </div>
      {/* List */}
      {/* Use Faculty state instead of static facultyData */}
      <Table columns={columns} renderRow={renderRow} data={Faculty}></Table>
      {/* Pagination */}
      <Pagination></Pagination>
    </div>
  );
};

export default FacultyListPage;
