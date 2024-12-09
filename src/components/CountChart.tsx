"use client";
import React from "react";
import Image from "next/image";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Club {
  name: string;
  eventsCount: number;
  fill: string;
  departmentData: DepartmentData[];
}

interface DepartmentData {
  department: string;
  students: number;
}

interface CountChartProps {
  clubs: Club[];
}

const CountChart: React.FC<CountChartProps> = ({ clubs }) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-primary">Club Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
      </div>
      {/* CHART */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={clubs}
              dataKey="eventsCount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {clubs.map((club, index) => (
                <Cell key={`Cell-${index}`} fill={club.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-8">
        {clubs.map(
          (club, index) =>
            club.name !== "Total" && (
              <div key={index} className="flex flex-col gap-1">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: club.fill }}
                ></div>
                <h1 className="font-bold">{club.name}</h1>
                <h2 className="text-xs text-gray-800">{club.eventsCount}</h2>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CountChart;
