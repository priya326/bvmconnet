"use client";
import React, { PureComponent } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    eventcount: 2,
  },
  {
    name: "Feb",
    eventcount: 3,
  },
  {
    name: "Mar",
    eventcount: 0,
  },
  {
    name: "Apr",
    eventcount: 1,
  },
  {
    name: "May",
    eventcount: 2,
  },
  {
    name: "Jun",
    eventcount: 0,
  },
  {
    name: "Jul",
    eventcount: 0,
  },
  {
    name: "Aug",
    eventcount: 1,
  },
  {
    name: "Sep",
    eventcount: 0,
  },
  {
    name: "Oct",
    eventcount: 1,
  },
  {
    name: "Nov",
    eventcount: 1,
  },
  {
    name: "Dec",
    eventcount: 0,
  },
];
const MonthChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex justify-between items-center pb-5">
        <h1 className="font-bold text-primary">Yearly</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
      </div>
      {/* chart */}

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9fadbd" }}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#9fadbd" }}
            tickLine={false}
            tickMargin={30}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />

          <Line
            type="monotone"
            dataKey="eventcount"
            stroke="#b2d8ff"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthChart;
