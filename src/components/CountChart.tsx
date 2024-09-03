"use client";
import Image from "next/image";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";

interface Club {
  name: string;
  eventsCount: number;
  fill: string;
  departmentData: DepartmentData[]; // This line should match the structure of your data
}

interface DepartmentData {
  department: string;
  students: number;
}

interface CountChartProps {
  clubs: Club[];
  onHover: (data: DepartmentData[]) => void;
}

// const generateRandomPastelColor = (): string => {
//   // Choose a random color base: 0 for blue, 1 for green, 2 for purple, 3 for yellow
//   const colorBase = Math.floor(Math.random() * 4);

//   let r, g, b;

//   switch (colorBase) {
//     case 0: // Blue
//       r = Math.floor(Math.random() * 56 + 200); // Keep red low for blue shades
//       g = Math.floor(Math.random() * 56 + 200); // Keep green low for blue shades
//       b = Math.floor(Math.random() * 56 + 200); // Blue is dominant
//       break;
//     case 1: // Green
//       r = Math.floor(Math.random() * 56 + 200); // Keep red low for green shades
//       g = Math.floor(Math.random() * 128 + 127); // Green is dominant
//       b = Math.floor(Math.random() * 56 + 200); // Keep blue low for green shades
//       break;
//     case 2: // Purple
//       r = Math.floor(Math.random() * 128 + 127); // Red is dominant
//       g = Math.floor(Math.random() * 56 + 200); // Keep green low for purple shades
//       b = Math.floor(Math.random() * 128 + 127); // Blue is dominant
//       break;
//     case 3: // Yellow
//       r = Math.floor(Math.random() * 128 + 127); // Red is dominant
//       g = Math.floor(Math.random() * 128 + 127); // Green is dominant
//       b = Math.floor(Math.random() * 56 + 200); // Keep blue low for yellow shades
//       break;
//   }

//   return `rgb(${r}, ${g}, ${b})`;
// };

const CountChart: React.FC<CountChartProps> = ({ clubs, onHover }) => {
  const handleMouseEnter = (club: Club) => {
    onHover(club.departmentData);
  };
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
              onMouseEnter={(data, index) =>
                onHover(clubs[index].departmentData)
              }
            >
              {clubs.map((club, index) => (
                <Cell key={`cell-${index}`} fill={club.fill} />
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
                  className="w-5 h-5  rounded-full"
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
