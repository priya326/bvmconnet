"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { decrypt } from "../../../../../utils/security";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPastEvents } from "@/lib/api_urls";

type Event = {
  eventId: number;
  name: string;
  club: string;
  date: string;
  report?: boolean;
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
    header: "Report",
    accessor: "report",
  },
];

const FacultyListPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

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
      const response = await fetch(getPastEvents, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          // Transform the response data to match your Event structure
          const mappedEvents = result.data.map((event: any) => ({
            eventId: event.id,
            name: event.name,
            // Check if the API returns clubs and correctly extract the name
            club:
              event.clubs && event.clubs.length > 0
                ? event.clubs[0].name
                : "Unknown",
            // Ensure the date is valid and can be parsed
            date: event.date
              ? new Date(event.date).toLocaleDateString()
              : "No Date Available",
            report: !!event.isEditRole, // Assuming 'isEditRole' determines if a report is available
          }));

          setEvents(mappedEvents); // Update events state
        } else {
          console.error("Expected an array of events, got:", result.data);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch event list:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching the event list:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const renderRow = (item: Event) => (
    <tr
      key={item.eventId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-2 p-2">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell uppercase">{item.club}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-4">
          {item.report ? (
            <button className="rounded-md bg-[#c1dce1]  flex justify-center items-center gap-2 font-medium p-2">
              <Image
                src="/download.png"
                alt="Download"
                width={25}
                height={25}
              />
              Download
            </button>
          ) : (
            <p>Report not available</p>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full items-center flex justify-center bg-light">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading events...</p> // Show loading text while fetching data
      ) : (
        <Table columns={columns} renderRow={renderRow} data={events} />
      )}

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default FacultyListPage;
