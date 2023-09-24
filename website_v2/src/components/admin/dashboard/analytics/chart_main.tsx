"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Monday",
    visits: 7000,
  },
  {
    name: "Tuesday",
    visits: 10000,
  },
  {
    name: "Wednesday",
    visits: 12000,
  },
  {
    name: "Thursday",
    visits: 14000,
  },
  {
    name: "Friday",
    visits: 22000,
  },
  {
    name: "Saturday",
    visits: 18000,
  },
  {
    name: "Sunday",
    visits: 12000,
  },
];

const ChartMain = () => {
  return (
    <ResponsiveContainer width="100%" height={320} className="mb-16">
      <AreaChart
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="visits"
          stroke="#51B6A5"
          fill="#51B6A5"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export {ChartMain};
