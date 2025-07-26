import React from 'react';
import { FaClock } from 'react-icons/fa';

function AvgTime({ avgTimeData, onChange, setTripData }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setTripData((prev) => ({ ...prev, avgTime: newValue }));
    onChange(newValue);
  };
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[33vw]">
      <p>What is the average time you expect to travel daily (in hours)?</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={avgTimeData}
          onChange={handleChange}
        />
        <span className="absolute  right-2 top-1/2 text-xl transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <FaClock />
        </span>
      </div>
    </div>
  );
}

export default AvgTime;
