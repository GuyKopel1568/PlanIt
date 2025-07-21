import React, { useState } from 'react';
import { TbMoodKidFilled } from 'react-icons/tb';

function KidsInclude({ onChange }) {
  const [hasKids, setHasKids] = useState(null);

  const handleToggle = (val) => {
    setHasKids(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col items-center">
      <p>Include kids?</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className={`border text-xl  w-[10vw] h-[5vh] rounded ${hasKids === true ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => handleToggle(true)}
        >
          Yes
        </button>
        <span className="ml-2 text-xl text-gray-500">
          <TbMoodKidFilled />
        </span>
        <button
          type="button"
          className={`border text-xl  w-[10vw] h-[5vh] rounded ${hasKids === false ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => handleToggle(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default KidsInclude;
