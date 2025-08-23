import React from 'react';
import ThemeButton from '../ThemeButton';

function Navbar() {
  return (
    <div className="flex justify-center ml-[40vw] items-center min-h-[80px]">
      <ul className="bg-gray-800 flex justify-evenly w-[40%] rounded-4xl mx-auto text-white p-4 text-center">
        <li>Your trips</li>
        <li>Your profile</li>
        <li>Contact us</li>
        <li>Settings</li>
        <li>
          <ThemeButton className="w-7 h-7 md:w-10 md:h-10" />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
