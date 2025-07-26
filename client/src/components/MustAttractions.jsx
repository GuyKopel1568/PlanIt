import React, { useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';

function MustAttractions({ mustAttractionsData, setTripData }) {
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[30vw] ">
      <p>Please add must-see attractions (comma separated)</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded-3xl w-[25vw] "
          type="text"
          value={mustAttractionsData.join(', ')}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              mustAttractions: e.target.value.split(','),
            }))
          }
        />
        <span className="absolute  right-2 top-1/2 text-xl transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <FaMapMarkedAlt />
        </span>
      </div>
    </div>
  );
}

export default MustAttractions;
