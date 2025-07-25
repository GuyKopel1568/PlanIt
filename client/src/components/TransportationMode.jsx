import React, { useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { FaBus } from 'react-icons/fa';

const transportationOptions = [
  { label: 'Private Vehicle', value: 'private', icon: <FaCar /> },
  { label: 'Public Transportation', value: 'public', icon: <FaBus /> },
];

function TransportationMode({ transportationData, onChange }) {
  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[33vw]">
      <p className="text-lg mb-4">
        How do you prefer to get around during your trip?
      </p>
      <div className="flex gap-4 justify-evenly">
        {transportationOptions.map((option) => {
          const isSelected = transportationData === option.value;
          return (
            <div
              key={option.value}
              className={`flex items-center gap-2 cursor-pointer w-[10vw] rounded-4xl p-4 justify-center transition-all
                ${
                  isSelected
                    ? 'bg-stone-700 text-white scale-105'
                    : 'bg-stone-300 hover:bg-stone-500 hover:text-white'
                }
              `}
              onClick={() => handleSelect(option.value)}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransportationMode;
