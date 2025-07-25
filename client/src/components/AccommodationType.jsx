import React, { useState } from 'react';

function AccommodationType({ onChange = () => {}, accommodationType }) {
  const handleSelect = (type) => {
    onChange(type);
  };

  const types = ['Basic', 'Comfort', 'Luxury'];

  return (
    <div className="flex flex-col gap-2 items-center bg-white rounded-4xl shadow-lg p-4">
      <p>Choose your accommodation type</p>
      <div className="flex gap-6">
        {types.map((type) => (
          <label
            key={type}
            onClick={() => handleSelect(type)}
            className={`px-4 py-2 rounded-2xl cursor-pointer border 
              ${accommodationType === type ? ' text-white bg-stone-700' : 'bg-stone-300 text-stone-700 '}
              hover:bg-stone-200 `}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

export default AccommodationType;
