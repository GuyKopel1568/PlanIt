import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { TbMoodKidFilled } from 'react-icons/tb';

function AdultsNumber({ onChange, adultsData }) {
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value) || 0;
    if (newValue > 7) {
      newValue = 7;
    }
    onChange(newValue);
  };

  return (
    <div>
      <p>How many adults are included?</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[28vw]"
          type="number"
          value={adultsData}
          onChange={handleChange}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <FaUserAlt />
        </span>
      </div>
    </div>
  );
}

export default AdultsNumber;
