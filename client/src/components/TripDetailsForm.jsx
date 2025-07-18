import React, { useState } from 'react';
import SecondTripPageForm from './TripDetailsFormPages.jsx/SecondTripPageForm';
import FirstTripPageForm from './TripDetailsFormPages.jsx/FirstTripPageForm';
import ThirdTripPageForm from './TripDetailsFormPages.jsx/ThirdTripPageForm';

function TripDetailsForm() {
  const [pageNumber, setPageNumber] = useState(1);
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const handleNextPage = () => {
    if (pageNumber < 3) {
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
      <div className="w-[80vw] h-[60vh] bg-white rounded-4xl shadow-lg p-6 overflow-hidden">
        {pageNumber === 1 && <FirstTripPageForm onNext={handleNextPage} />}
        {pageNumber === 2 && (
          <SecondTripPageForm
            onNext={handleNextPage}
            onBack={handlePreviousPage}
          />
        )}
        {pageNumber === 3 && <ThirdTripPageForm onBack={handlePreviousPage} />}
      </div>
    </div>
  );
}

export default TripDetailsForm;
