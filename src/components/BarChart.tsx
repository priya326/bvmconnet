"use client";
import React from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DepartmentData {
  department: string;
  students: number;
}

interface BarChartProps {
  data: DepartmentData[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-primary">Department Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
      </div>
      <div className="mt-5">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={500} height={300} data={data} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              tick={false}
              axisLine={false}
              tickLine={false}
              stroke="#ddd"
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#9fadbd" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Bar dataKey="students" fill="#8ab0ee" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <span className=" flex justify-center text-gray-700 font-light my-2">
        Hover on PieChart to view department-wise attendance during the events
        of a club
      </span>
    </div>
  );
};

export default BarChartComponent;
