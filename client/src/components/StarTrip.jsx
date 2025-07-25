import React from 'react';

function StarTrip({ tripData, setTripData }) {
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-[30vw]">
      <p>Do you prefer to return to the same place every day?</p>
      <div className="flex gap-4 justify-evenly">
        <span
          className={`cursor-pointer ${tripData.isStarTrip ? 'text-white bg-stone-700' : 'bg-stone-300'}  rounded-2xl p-4`}
          onClick={() => setTripData((prev) => ({ ...prev, isStarTrip: true }))}
        >
          Yes
        </span>
        <span
          className={`cursor-pointer ${!tripData.isStarTrip ? 'text-white bg-stone-700' : 'bg-stone-300'}  rounded-2xl p-4`}
          onClick={() =>
            setTripData((prev) => ({ ...prev, isStarTrip: false }))
          }
        >
          No
        </span>
      </div>
    </div>
  );
}

export default StarTrip;
