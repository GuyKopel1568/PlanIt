import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import TripDetailsForm from '../TripDetailsForm.jsx';

function AddTrip() {
  const [isTripFormVisible, setIsTripFormVisible] = useState(false);

  const openForm = () => setIsTripFormVisible(true);
  const closeForm = () => setIsTripFormVisible(false);

  return (
    <>
      <div
        className="w-[10vw] h-[30vh] p-4 rounded-lg shadow-md border-2 border-dashed border-stone-200
                   cursor-pointer flex items-center justify-center hover:bg-white/20 hover:backdrop-blur-lg transition-colors"
        onClick={openForm}
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="text-gray-500 uppercase">Build another trip</span>
          <FiPlus className="text-gray-500 text-2xl mt-2" />
        </div>
      </div>

      {isTripFormVisible && <TripDetailsForm onClose={closeForm} />}
    </>
  );
}

export default AddTrip;
