import React from 'react';

import '../styles/MainHeader.css';

function MainHeader() {
  return (
    <div className="flex justify-center items-center">
      <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-neutral-500 to-sky-400 dark:from-zinc-200 dark:via-blue-300 dark:to-teal-200 font-[Playfair_Display]">
        PLANIT
      </h1>
    </div>
  );
}

export default MainHeader;
