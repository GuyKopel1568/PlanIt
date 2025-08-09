import React, { useEffect, useState } from 'react';
import FirstTripPageForm from './TripDetailsFormPages.jsx/FirstTripPageForm';
import SecondTripPageForm from './TripDetailsFormPages.jsx/SecondTripPageForm';
import ThirdTripPageForm from './TripDetailsFormPages.jsx/ThirdTripPageForm';
import FourthTripPageForm from './TripDetailsFormPages.jsx/FourthTripPageForm';
import FifthTripPageForm from './TripDetailsFormPages.jsx/FifthTripPageForm';

function TripDetailsForm({ onClose }) {
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
    isStarTrip: '',
    mustAttractions: [],
    numberAttractionsAvg: '',
  });

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleNextPage = () => setPageNumber((p) => Math.min(5, p + 1));
  const handlePreviousPage = () => setPageNumber((p) => Math.max(1, p - 1));

  return (
    // Click outside closes (onClose). Clicking inside stops propagation.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        className="relative z-50 lg:w-[75vw] lg:h-[75vh] md:h-[70vh] bg-white rounded-4xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 rounded-full w-9 h-9 grid place-items-center
                     hover:bg-stone-100 transition cursor-pointer"
        >
          ✕
        </button>

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
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default TripDetailsForm;
