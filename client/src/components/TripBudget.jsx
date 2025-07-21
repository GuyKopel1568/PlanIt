import React, { useState } from 'react';

function TripBudget({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <p>Enter your trip budget</p>
      <div className="relative inline-block">
        <input
          className="border border-gray-300 p-2 rounded pr-6 w-[25vw]"
          type="number"
          value={value}
          onChange={handleChange}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          $
        </span>
      </div>
    </div>
  );
}

export default TripBudget;
