"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { getToken } from "../../../../../utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  eventStatusUpdate,
  getUpcomingEvents,
  getEventPermissionDocument,
} from "@/lib/api_urls";
import CustomToast, { showToast } from "@/components/Toast";

type Event = {
  eventId: number;
  name: string;
  club: string;
  date: string;
  status: string;
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
    header: "Permission",
    accessor: "Permission",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
  },
];

const PermListPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    fetchData(); // Fetch data on mount
  }, []);

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      showToast("error", "You need to log in.");
      router.push("/sign-in");
      return;
    }
    setLoading(true); // Start loading state

    try {
      const response = await fetch(getUpcomingEvents, {
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
          const mappedEvents = result.data
            .map((event: any) => ({
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
              status: event.status,
            }))
            .filter((event: any) => event.status === "unapproved");

          setEvents(mappedEvents);
          // Update events state
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
  const handleFetchAndViewHTML = async (eventId: number, is_docx: boolean) => {
    const token = getToken();
    try {
      const response = await fetch(getEventPermissionDocument, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ event_id: eventId, is_docx: is_docx }),
      });
      // if (!response.ok) {
      //   const error = await response.json();
      //   console.error("Error from API:", error.msg);
      //   return;
      // }

      // const result = await response.text(); // Or `.json()` if expecting JSON
      // console.log("Success:", result);
      if (response.ok) {
        const htmlContent = await response.text();

        // Open the raw HTML content in a new tab
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(htmlContent);
          newTab.document.close(); // Ensure the document finishes loading
        } else {
          console.error("Failed to open a new tab.");
        }
      } else {
        console.error("Failed to fetch the HTML document.");
      }
    } catch (error) {
      console.error("Error fetching HTML document:", error);
    }
  };

  const updateEventStatus = async (eventId: number, newStatus: string) => {
    const token = getToken();
    if (!token) {
      showToast("error", "You need to log in.");
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch(eventStatusUpdate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId, status: newStatus }),
      });

      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.eventId === eventId ? { ...event, status: newStatus } : event
          )
        );
        showToast("success", `Event ${newStatus.toLowerCase()} successfully.`);
      } else {
        const errorData = await response.json();
        alert(`Failed to update status: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred while updating event status:", error);
      alert("Failed to update status. Please try again.");
    }
  };
  const filteredEvents = events.filter((event) =>
    [event.name, event.club, event.date].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
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
        <div className="">
          <button
            className="bg-third text-white px-4 py-2 rounded flex flex-row justify-between items-center"
            onClick={() => handleFetchAndViewHTML(item.eventId, false)}
          >
            <Image
              src="/download.png"
              alt=""
              width={20}
              height={20}
              className="mr-1"
            />
            Letter
          </button>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-4">
          <button
            className="bg-green px-2 py-2 rounded-md text-white"
            onClick={() => updateEventStatus(item.eventId, "Approved")}
          >
            Approve
          </button>
          <button
            className="bg-red-400 px-2 py-2 rounded-md text-white"
            onClick={() => updateEventStatus(item.eventId, "Rejected")}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <CustomToast />
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Events</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
          <Table
            columns={columns}
            renderRow={renderRow}
            data={filteredEvents}
          />
        )}

        {/* Pagination */}
        <Pagination />
      </div>
    </>
  );
};

export default PermListPage;
