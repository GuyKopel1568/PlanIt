import React from 'react';
import { FaCar } from 'react-icons/fa';
import { FaBus } from 'react-icons/fa';

function TransportationMode({ transportationData, onChange, setTripData }) {
  const transportationOptions = [
    { label: 'Private Vehicle', value: 'private', icon: <FaCar /> },
    { label: 'Public Transportation', value: 'public', icon: <FaBus /> },
  ];

  const handleSelect = (value) => {
    setTripData((prev) => ({ ...prev, transportationMode: value }));
    onChange(value);
  };

  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[33vw] ">
      <p>How do you prefer to get around during your trip</p>
      <div className="flex gap-4 justify-evenly ">
        {transportationOptions.map((option) => (
          <div
            key={option.value}
            className={`flex items-center gap-2 ${transportationData === option.value ? 'text-white bg-stone-700' : 'bg-stone-300'} w-[10vw] rounded-4xl p-4`}
            onClick={() => handleSelect(option.value)}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransportationMode;
