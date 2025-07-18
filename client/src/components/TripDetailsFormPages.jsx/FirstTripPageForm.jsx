import React from 'react';
function FirstTripPageForm({ onNext }) {
  return (
    <>
      <div className="flex justify-between pr-20 ">
        <div className="w-[80%] ">
          <h2 className="text-3xl font-bold mb-4">WELCOME</h2>
          <h3 className="text-2xl mb-4">Ready to plan your trip?</h3>
          <p className="text-md mb-6">
            We're here to help you plan your{' '}
            <strong>perfect personalized trip</strong> – based on your
            interests, budget, travel preferences, number of days, and more.
            <br />
            Just answer a few quick questions, and we'll take care of the rest.
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <img
              className="h-[40vh] rounded-full"
              src="./airplaneWindow.png"
              alt="airplane"
            />
            <button
              className="w-[100%] mb-10 bg-sky-500 rounded-4xl p-5 cursor-pointer text-white font-bold text-lg ml-4 hover:bg-sky-600 transition-colors duration-300 active:scale-95"
              onClick={onNext}
            >
              Let’s get started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstTripPageForm;
