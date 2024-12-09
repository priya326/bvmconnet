"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {
  addClubCoordinator,
  getClubs,
  removeClubCoordinator,
} from "@/lib/api_urls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../../../../../utils/auth";
import CustomToast, { showToast } from "@/components/Toast";

type Faculty = {
  FacultyId: number;
  name: string;
  email: string;
  club: string;
  dept: string;
  club_id: number;
};

type Club = {
  id: number;
  name: string;
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
  const [Clubs, setClubs] = useState<Club[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedClub, setSelectedClub] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    fetchData(); // Fetch data on mount
  }, []);
  const filteredFaculty = Faculty.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      showToast("error", "You need to log in.");
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
          const mappedFaculties = result.data.flatMap((club: any) =>
            club.faculties.map((faculty: any) => ({
              FacultyId: faculty.id,
              name: `${faculty.user.first_name} ${faculty.user.last_name}`,
              email: faculty.user.email,
              club: club.name,
              dept: club.department.name,
              club_id: club.id,
            }))
          );

          const mappedClubs = result.data.map((club: any) => ({
            id: club.id,
            name: club.name,
          }));

          setFaculty(mappedFaculties);
          setClubs(mappedClubs);
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
  const getUniqueFaculties = (faculties: Faculty[]) => {
    const uniqueFaculties = new Map();
    faculties.forEach((faculty) => {
      if (!uniqueFaculties.has(faculty.FacultyId)) {
        uniqueFaculties.set(faculty.FacultyId, faculty);
      }
    });
    return Array.from(uniqueFaculties.values());
  };

  const uniqueFaculties = getUniqueFaculties(Faculty);
  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      showToast("error", "You need to log in.");
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch(addClubCoordinator, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          club_id: selectedClub,
          faculty_id: selectedFaculty,
        }),
      });

      if (response.ok) {
        showToast("success", `Coordinator added successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setShowForm(false); // Close form after submission
      } else {
        const errorData = await response.json();
        alert(`Failed to add coordinator: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while adding coordinator:", error);
      alert("Failed to add coordinator. Please try again.");
    }
  };
  const removeCoordinator = async (club_id: number, faculty_id: number) => {
    const token = getToken();
    console.log(club_id, faculty_id);
    if (!token) {
      showToast("error", "You need to log in.");
      router.push("/sign-in");
      return;
    }

    // Ask for confirmation before proceeding
    const confirmed = window.confirm(
      "Are you sure you want to remove this coordinator?"
    );
    if (!confirmed) {
      return; // Exit if the user cancels the operation
    }

    try {
      const response = await fetch(removeClubCoordinator, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          club_id: club_id,
          faculty_id: faculty_id,
        }),
      });

      if (response.ok) {
        showToast("success", `Coordinator Removed successfully.`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setShowForm(false); // Close form after submission
      } else {
        const errorData = await response.json();
        alert(`Failed to remove coordinator: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while removing the coordinator:", error);
      alert("Failed to remove coordinator. Please try again.");
    }
  };

  const renderRow = (item: Faculty) => (
    <tr
      key={item.FacultyId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-2 p-2">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell uppercase">{item.club}</td>
      <td className="hidden md:table-cell capitalize">{item.dept}</td>
      <td>
        <button
          className="bg-red-400 px-2 py-2 rounded-md text-white"
          onClick={() => removeCoordinator(item.club_id, item.FacultyId)}
        >
          Remove
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <CustomToast></CustomToast>
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            Faculty Coordinators
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
                <Image src="/filter.png" alt="" width={14} height={14}></Image>
              </button>
              <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
                <Image src="/sort.png" alt="" width={14} height={14}></Image>
              </button>
              <button
                className="bg-secondary p-2 rounded-md text-white"
                onClick={() => setShowForm((prev) => !prev)}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Add Coordinator</h2>
              <div className="mb-4">
                <label htmlFor="faculty" className="block mb-2">
                  Select Faculty
                </label>
                <select
                  id="faculty"
                  className="w-full p-2 border rounded-md"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">-- Select Faculty --</option>
                  {uniqueFaculties.map((faculty) => (
                    <option key={faculty.FacultyId} value={faculty.FacultyId}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="club" className="block mb-2">
                  Select Club
                </label>
                <select
                  id="club"
                  className="w-full p-2 border rounded-md"
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                >
                  <option value="">-- Select Club --</option>
                  {Clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  className="bg-primary p-2 rounded-md text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-400 p-2 rounded-md text-white"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <Table
          columns={columns}
          renderRow={renderRow}
          data={filteredFaculty}
        ></Table>

        {/* Pagination */}
        <Pagination></Pagination>
      </div>
    </>
  );
};

export default FacultyListPage;
