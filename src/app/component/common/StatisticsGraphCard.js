import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {api} from "../../../utils/helper"

const StatisticsCard = ({ title, value,  data, strokeColor }) => (
  <div className="bg-buttontext rounded-xl shadow-lg p-4 h-56 w-full md:w-1/3 flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="flex flex-col gap-4 justify-between">
      <div>
        <h3 className="text-[#9291A5] text-sm">Statistics</h3>
        <h2 className="text-xl font-bold text-black">{title}</h2>
      </div>
      <div>
        <p className="text-4xl font-bold text-black">{value}</p>
        {/* <p
          className={`text-sm ${percentage.includes("-") ? "text-red-600" : "text-green-600"}`}
        >
          {percentage}
        </p> */}
      </div>
    </div>
    <div style={{ height: "100px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Statistics = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalVotes: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve pollId from localStorage
        const pollId = localStorage.getItem("pollId");
        if (!pollId) {
          console.error("Poll ID not found in localStorage");
          return; // Exit if there's no pollId
        }

        // Construct the API URL using the pollId
        const response = await fetch(`${api}/polls/${pollId}/stats/graph`);
        const result = await response.json();
        
        const { total_visitors, total_votes, conversion_rate } = result.stats;

        setStats({
          totalVisitors: total_visitors,
          totalVotes: total_votes,
          conversionRate: conversion_rate,
        });

        // Prepare data for the LineChart (adjust as needed)
        setData([
          { name: "Visitors", value: total_visitors },
          { name: "Votes", value: total_votes },
          { name: "Conversion Rate", value: conversion_rate },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap">
      <StatisticsCard
        title="Realtime users"
        value={stats.totalVisitors}
       
        data={data} // Adjusted data structure for the line chart
        strokeColor="#FFA500"
      />
      <StatisticsCard
        title="Total votes"
        value={stats.totalVotes}

        data={data} // Adjusted data structure for the line chart
        strokeColor="#4CAF50"
      />
      <StatisticsCard
        title="Conversion Rate"
        value={`${(stats.conversionRate).toFixed(2)}%`}
       
        data={data} // Adjusted data structure for the line chart
        strokeColor="#F44336"
      />
    </div>
  );
};

export default Statistics;
