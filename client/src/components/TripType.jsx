import React, { useState } from 'react';
import { FaSkiing } from 'react-icons/fa';
import { PiPokerChipFill } from 'react-icons/pi';
import { FaGlassMartiniAlt } from 'react-icons/fa';
import { FaUmbrellaBeach } from 'react-icons/fa6';
import { FaCity } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { LuPartyPopper } from 'react-icons/lu';
import { MdMuseum } from 'react-icons/md';
import { FaTree } from 'react-icons/fa';
import { LuMountainSnow } from 'react-icons/lu';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { FaBowlFood } from 'react-icons/fa6';
import { TbRollercoaster } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaCampground } from 'react-icons/fa';
import { PiTowelFill } from 'react-icons/pi';
import { GiParachute } from 'react-icons/gi';

function TripType({ onChange }) {
  const [tripTypes, setTripTypes] = useState([]);

  const types = [
    { label: 'Gambling', value: 'gambling', icon: <PiPokerChipFill /> },
    { label: 'Nightlife', value: 'nightlife', icon: <FaGlassMartiniAlt /> },
    { label: 'Beach & Relaxation', value: 'beach', icon: <FaUmbrellaBeach /> },
    { label: 'City Vacation', value: 'city', icon: <FaCity /> },
    { label: 'Shopping', value: 'shopping', icon: <FaShoppingBag /> },
    { label: 'Honeymoon', value: 'honeymoon', icon: <FaHeart /> },
    {
      label: 'Bachelor Party',
      value: 'bachelor_party',
      icon: <LuPartyPopper />,
    },
    { label: 'Culture & Museums', value: 'culture', icon: <MdMuseum /> },
    { label: 'Nature & Landscapes', value: 'nature', icon: <FaTree /> },
    { label: 'Hiking', value: 'hiking', icon: <LuMountainSnow /> },
    { label: 'Adventure ', value: 'adventure', icon: <GiParachute /> },
    {
      label: 'Sports Events',
      value: 'sports',
      icon: <MdOutlineSportsBasketball />,
    },
    { label: 'Culinary ', value: 'culinary', icon: <FaBowlFood /> },
    { label: 'Theme Parks', value: 'theme_parks', icon: <TbRollercoaster /> },
    { label: 'Family Trip', value: 'family', icon: <MdFamilyRestroom /> },
    { label: 'Camping', value: 'camping', icon: <FaCampground /> },
    { label: 'Ski', value: 'ski', icon: <FaSkiing /> },
    { label: 'Wellness & Spa', value: 'spa', icon: <PiTowelFill /> },
  ];

  return (
    <div className="flex flex-col gap-4 items-center w-[40vw] rounded-4xl shadow-lg pb-4">
      <p>Trip Type</p>
      <div className="grid grid-cols-3 gap-3">
        {types.map((type) => (
          <div
            key={type.value}
            className="flex text-center items-center bg-stone-300 rounded-4xl gap-4 p-2 cursor-pointer hover:bg-stone-600 hover:text-stone-100 hover:scale-110  justify-center"
          >
            <span>{type.icon}</span>
            <span className="ml-2">{type.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripType;
