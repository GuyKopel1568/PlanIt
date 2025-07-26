import React from 'react';

function StarTrip({ starTripData, setTripData }) {
  return (
    <div className="shadow-2xl p-4 rounded-4xl bg-white w-full max-w-[30vw]">
      <p className="text-lg font-semibold mb-2">
        Do you prefer to return to the same place every day?
      </p>
      <div className="flex gap-4 justify-evenly">
        <span
          className={`cursor-pointer px-6 py-2 rounded-2xl transition-all ${
            starTripData === 'Yes' ? 'bg-stone-700 text-white' : 'bg-stone-300'
          }`}
          onClick={() =>
            setTripData((prev) => ({ ...prev, isStarTrip: 'Yes' }))
          }
        >
          Yes
        </span>
        <span
          className={`cursor-pointer px-6 py-2 rounded-2xl transition-all ${
            starTripData === 'No' ? 'bg-stone-700 text-white' : 'bg-stone-300'
          }`}
          onClick={() => setTripData((prev) => ({ ...prev, isStarTrip: 'No' }))}
        >
          No
        </span>
      </div>
    </div>
  );
}

export default StarTrip;
