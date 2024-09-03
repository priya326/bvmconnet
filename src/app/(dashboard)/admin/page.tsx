"use client";
import UserCards from "@/components/UserCards";
import CountChart from "@/components/CountChart";
import EventsCalendar from "@/components/EventsCalendar";
import React, { useState } from "react";
import BarChartComponent from "@/components/BarChart";
import MonthChart from "@/components/MonthChart";

interface DepartmentData {
  department: string;
  students: number;
}
const clubs = [
  {
    name: "IEEE",
    eventsCount: 5,
    fill: "#b2d8ff",
    departmentData: [
      { department: "Civil", students: 30 },
      { department: "Computer", students: 45 },
      { department: "Electronics", students: 20 },
      { department: "Electrical", students: 15 },
      { department: "Mechanical", students: 25 },
      { department: "Production", students: 10 },
      { department: "Electronics & Communication", students: 35 },
      { department: "IT", students: 40 },
    ],
  },
  {
    name: "GDSC",
    eventsCount: 1,
    fill: "#6c769b",
    departmentData: [
      { department: "Civil", students: 25 },
      { department: "Computer", students: 50 },
      { department: "Electronics", students: 22 },
      { department: "Electrical", students: 18 },
      { department: "Mechanical", students: 30 },
      { department: "Production", students: 12 },
      { department: "Electronics & Communication", students: 40 },
      { department: "IT", students: 45 },
    ],
  },
  {
    name: "CSI",
    eventsCount: 2,
    fill: "#8faece",
    departmentData: [
      { department: "Civil", students: 25 },
      { department: "Computer", students: 50 },
      { department: "Electronics", students: 22 },
      { department: "Electrical", students: 18 },
      { department: "Mechanical", students: 30 },
      { department: "Production", students: 12 },
      { department: "Electronics & Communication", students: 40 },
      { department: "IT", students: 45 },
    ],
  },
  {
    name: "GFG",
    eventsCount: 3,
    fill: "#9b89b3",
    departmentData: [
      { department: "Civil", students: 20 },
      { department: "Computer", students: 40 },
      { department: "Electronics", students: 25 },
      { department: "Electrical", students: 20 },
      { department: "Mechanical", students: 28 },
      { department: "Production", students: 15 },
      { department: "Electronics & Communication", students: 38 },
      { department: "IT", students: 42 },
    ],
  },
];
const AdminPage: React.FC = () => {
  const [selectedClubData, setSelectedClubData] = useState<DepartmentData[]>(
    []
  );

  const handleHover = (data: DepartmentData[]) => {
    setSelectedClubData(data);
  };

  return (
    <div className="gap-4 flex flex-col p-4 md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className=" flex gap-4 justify-between flex-wrap">
          <UserCards type="Clubs"></UserCards>
          <UserCards type="Events"></UserCards>
          <UserCards type="Faculty Coordinators"></UserCards>
          <UserCards type="Students"></UserCards>
        </div>
        {/* Middle */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* RADIAL */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart clubs={clubs} onHover={handleHover} />
          </div>
          {/* LINE */}
          <div className="w-full lg:w-2/3 h-[450px] ">
            <BarChartComponent data={selectedClubData} />
          </div>
        </div>
        {/* Bottom BAR GRAPH*/}
        <div className="w-full h-[500px]">
          <MonthChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3  flex flex-col gap-8">
        <EventsCalendar></EventsCalendar>
      </div>
    </div>
  );
};

export default AdminPage;
