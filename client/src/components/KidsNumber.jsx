import React, { useState } from 'react';
import { TbMoodKidFilled } from 'react-icons/tb';

function KidsNumber({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (newValue > 5) {
      newValue = 5;
    }
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <p>How many kids are included?</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={value}
          onChange={handleChange}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <TbMoodKidFilled />
        </span>
      </div>
    </div>
  );
}

export default KidsNumber;
