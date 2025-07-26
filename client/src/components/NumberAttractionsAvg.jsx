import React from 'react';
import { IoTicketSharp } from 'react-icons/io5';

function NumberAttractionsAvg({ numberAttractionsAvgData, setTripData }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setTripData((prev) => ({
      ...prev,
      numberAttractionsAvg: newValue,
    }));
  };
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[30vw]">
      <p>
        What is the average number of attractions you expect to visit daily?
      </p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={numberAttractionsAvgData}
          onChange={handleChange}
        />
        <span className="absolute  right-2 top-1/2 text-xl transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <IoTicketSharp />
        </span>
      </div>
    </div>
  );
}

export default NumberAttractionsAvg;
