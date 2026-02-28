// components/AgeGraphComponent.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { ageRange: "18-24", male: 3.3, female: 1.8 },
  { ageRange: "25-34", male: 12.7, female: 8.4 },
  { ageRange: "35-44", male: 15.2, female: 9.6 },
  { ageRange: "45-64", male: 25.3, female: 15.7 },
  { ageRange: "65+", male: 33.5, female: 21.1 },
];

const AgeGraphComponent = () => (
  <div className="w-full max-w-[1044px] mx-auto border border-buttontext p-8 rounded-[20px] shadow-md">
    <div className="flex justify-between items-center">
      <h3 className="text-[#615E83] text-[14px] md:text-[18px] font-normal">Statistics</h3>

      <span className="text-[#615E83] text-[14px] md:text-[18px] font-normal">Total: </span>
    </div>
    <div className="flex justify-between ">
      <div className="flex items-center gap-1 md:gap-4">
        <h3 className="text-[#1E1B39] font-bold text-[12px] md:text-[22px]">Age and Gender</h3>

        <div className="flex items-center">
          <div className="w-2.5 h-2.5 bg-[#4A43EC] rounded-full mr-1.5"></div>
          <span className="text-xs text-[#1E1B39]">Male</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 bg-[#C5CFFF] rounded-full mr-1.5"></div>
          <span className="text-xs text-[#1E1B39]">Female</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-[#1E1B39] font-bold text-[12px] md:text-[22px]">31,863</span>
      </div>
    </div>
    <div className="flex justify-center">
      <hr className="w-full border-t-2 border-gray-300 mt-4" />
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={data}
        barSize={8}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <YAxis
          dataKey="ageRange"
          type="category"
          width={50}
          axisLine={false}
          tickLine={false}
        />
        <XAxis type="number" hide />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="female" fill="#C5CFFF" radius={[0, 10, 10, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Bar>
        <Bar dataKey="male" fill="#4A43EC" radius={[0, 10, 10, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AgeGraphComponent;
