"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getPastEvents } from "@/lib/api_urls";
import { decrypt } from "../../utils/security";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
type Event = {
  eventId: number;
  name: string;
  club: string;
  date: string;
};
const EventsCalendar = (item: Event) => {
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
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl my-4">Events</h1>
          <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
        </div>
        {events.map((event) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-light even:border-t-sixth">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{item.name}</h1>
              <span className="text-gray-400 text-xs">{item.date}</span>
            </div>
            <h2 className="mt-2 text-gray-500 text-sm">{item.club}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCalendar;
