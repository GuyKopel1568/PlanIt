import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { TbMoodKidFilled } from 'react-icons/tb';

function AdultsNumber({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (newValue > 7) {
      newValue = 7;
    }
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <p>How many adults are included?</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={value}
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
