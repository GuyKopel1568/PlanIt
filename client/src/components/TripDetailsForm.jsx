import React, { useState } from 'react';
import SecondTripPageForm from './TripDetailsFormPages.jsx/SecondTripPageForm';
import FirstTripPageForm from './TripDetailsFormPages.jsx/FirstTripPageForm';
import ThirdTripPageForm from './TripDetailsFormPages.jsx/ThirdTripPageForm';
import FourthTripPageForm from './TripDetailsFormPages.jsx/FourthTripPageForm';
import FifthTripPageForm from './TripDetailsFormPages.jsx/FifthTripPageForm';

function TripDetailsForm() {
  const [pageNumber, setPageNumber] = useState(1);

  const handleNextPage = () => {
    if (pageNumber < 5) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      <div
        className="relative lg:w-[75vw] lg:h-[75vh] md:h-[70vh] bg-white rounded-4xl shadow-lg p-6 
  overflow-hidden 
  overflow-x-hidden 
  scroll-smooth 
  lg:overflow-hidden
  sm:overflow-y-auto 
  md:overflow-y-auto 

  z-50"
      >
        {pageNumber === 1 && <FirstTripPageForm onNext={handleNextPage} />}
        {pageNumber === 2 && (
          <SecondTripPageForm
            onNext={handleNextPage}
            onBack={handlePreviousPage}
          />
        )}
        {pageNumber === 3 && (
          <ThirdTripPageForm
            onBack={handlePreviousPage}
            onNext={handleNextPage}
          />
        )}
        {pageNumber === 4 && (
          <FourthTripPageForm
            onBack={handlePreviousPage}
            onNext={handleNextPage}
          />
        )}
        {pageNumber === 5 && <FifthTripPageForm onBack={handlePreviousPage} />}
      </div>
    </div>
  );
}

export default TripDetailsForm;
