import React from 'react';
import { IoIosSpeedometer } from 'react-icons/io';

function AvgDistance({ onChange, tripData, setTripData }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setTripData((prev) => ({ ...prev, avgDistance: newValue }));
    onChange(newValue);
  };
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[33vw]">
      <p>What is the average distance you expect to travel daily (in km)?</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={tripData.avgDistance}
          onChange={handleChange}
        />
        <span className="absolute  right-2 top-1/2 text-xl transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <IoIosSpeedometer />
        </span>
      </div>
    </div>
  );
}

export default AvgDistance;
