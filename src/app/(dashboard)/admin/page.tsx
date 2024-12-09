"use client";
import React, { useState, useEffect } from "react";
import UserCards from "@/components/UserCards";
import CountChart from "@/components/CountChart";
import EventsCalendar from "@/components/EventsCalendar";
import MonthChart from "@/components/MonthChart";
import { getClubs, getPastEvents } from "../../../lib/api_urls"; // Adjust API imports
import { decrypt } from "../../../../utils/security"; // Import your decryption function
import { getToken } from "../../../../utils/auth";

interface DepartmentData {
  department: string;
  students: number;
}

interface Club {
  name: string;
  eventsCount: number;
  fill: string;
  departmentData: DepartmentData[];
}

interface EventClub {
  id: number;
  name: string;
}

interface EventData {
  id: number;
  name: string;
  clubs: EventClub[];
}

const AdminPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      if (!token) {
        alert("You need to log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch clubs data
        const responseClubs = await fetch(getClubs, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const dataClubs = await responseClubs.json();
        if (responseClubs.ok) {
          console.log("Fetched Clubs Data:", dataClubs.data);

          if (dataClubs.data && Array.isArray(dataClubs.data)) {
            setClubs(dataClubs.data); // Save clubs data
          } else {
            console.error("Fetched data is not an array:", dataClubs.data);
          }
        } else {
          const errorDataClubs = await responseClubs.json();
          console.error("Failed to fetch clubs:", errorDataClubs.message);
        }

        // Fetch past events data
        const responseEvents = await fetch(getPastEvents, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseEvents.ok) {
          const dataEvents = await responseEvents.json();
          console.log("Fetched Events Data:", dataEvents.data);

          if (dataEvents.data && Array.isArray(dataEvents.data)) {
            // Calculate event counts for each club
            const updatedClubs = dataClubs.data.map(
              (club: Club, index: number) => {
                const eventCount = dataEvents.data.reduce(
                  (count: number, event: EventData) => {
                    const hasClub = event.clubs.some(
                      (eventClub: EventClub) =>
                        eventClub.name.toLowerCase() === club.name.toLowerCase()
                    );
                    return hasClub ? count + 1 : count;
                  },
                  0
                );

                const shadeOfBlue = `hsl(210, 100%, ${
                  20 + ((index * 5) % 20)
                }%)`;

                return {
                  ...club,
                  eventsCount: eventCount,
                  fill: shadeOfBlue, // Assign the shade of blue
                };
              }
            );

            setClubs(updatedClubs); // Update the clubs state with the new data
          } else {
            console.error(
              "Fetched events data is not an array:",
              dataEvents.data
            );
          }
        } else {
          const errorDataEvents = await responseEvents.json();
          console.error("Failed to fetch events:", errorDataEvents.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="gap-4 flex flex-col p-4 md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCards type="Clubs"></UserCards>
          <UserCards type="Events"></UserCards>
          <UserCards type="Faculty Coordinators"></UserCards>
          <UserCards type="Students"></UserCards>
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full  h-[450px]">
            <MonthChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <CountChart clubs={clubs} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventsCalendar></EventsCalendar>
      </div>
    </div>
  );
};

export default AdminPage;
