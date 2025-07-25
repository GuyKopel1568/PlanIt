import React, { useState } from 'react';
import FirstTripPageForm from './TripDetailsFormPages.jsx/FirstTripPageForm';
import SecondTripPageForm from './TripDetailsFormPages.jsx/SecondTripPageForm';
import ThirdTripPageForm from './TripDetailsFormPages.jsx/ThirdTripPageForm';
import FourthTripPageForm from './TripDetailsFormPages.jsx/FourthTripPageForm';
import FifthTripPageForm from './TripDetailsFormPages.jsx/FifthTripPageForm';

function TripDetailsForm() {
  const [pageNumber, setPageNumber] = useState(1);

  const [tripData, setTripData] = useState({
    selectedCountries: [],
    selectedCities: [],
    selectedDates: [{ startDate: new Date(), endDate: new Date() }],
    selectedAirport: { landingAirport: '', departureAirport: '' },
    budget: '',
    adultNumber: '',
    tripType: [],
    accommodationType: 'basic',
    kidsNumber: '',
    transportationMode: '',
    avgDistance: '',
    avgTime: '',
    isStarTrip: false,
    mustAttractions: [],
  });

  const handleNextPage = () => {
    if (pageNumber < 5) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  console.log('Trip Data:', tripData);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40" />

      <div
        className="relative lg:w-[75vw] lg:h-[75vh] md:h-[70vh] bg-white rounded-4xl shadow-lg p-6 
         z-50"
      >
        {pageNumber === 1 && <FirstTripPageForm onNext={handleNextPage} />}

        {pageNumber === 2 && (
          <SecondTripPageForm
            onNext={handleNextPage}
            onBack={handlePreviousPage}
            tripData={tripData}
            setTripData={setTripData}
          />
        )}

        {pageNumber === 3 && (
          <ThirdTripPageForm
            onNext={handleNextPage}
            onBack={handlePreviousPage}
            tripData={tripData}
            setTripData={setTripData}
          />
        )}

        {pageNumber === 4 && (
          <FourthTripPageForm
            onNext={handleNextPage}
            onBack={handlePreviousPage}
            tripData={tripData}
            setTripData={setTripData}
          />
        )}

        {pageNumber === 5 && (
          <FifthTripPageForm
            onBack={handlePreviousPage}
            tripData={tripData}
            setTripData={setTripData}
          />
        )}
      </div>
    </div>
  );
}

export default TripDetailsForm;
