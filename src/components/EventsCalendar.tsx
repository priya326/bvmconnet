"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const events = [
  { id: 1, eventName: "AI Launchpad", date: "26-08-2024", club: "CSI" },
  { id: 2, eventName: "AI Launchpad", date: "26-08-2024", club: "CSI" },
  { id: 3, eventName: "AI Launchpad", date: "26-08-2024", club: "CSI" },
];
const EventsCalendar = () => {
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
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-light even:border-t-sixth"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.eventName}</h1>
              <span className="text-gray-400 text-xs">{event.date}</span>
            </div>
            <h2 className="mt-2 text-gray-500 text-sm">{event.club}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCalendar;
