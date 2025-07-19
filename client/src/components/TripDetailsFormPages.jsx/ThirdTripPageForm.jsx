import React from 'react';
import FormButton from '../FormButton';

function ThirdTripPageForm({ onNext, onBack }) {
  return (
    <div className="flex justify-between p-8">
      <FormButton text="Back" onClick={onBack} />
      <FormButton text="Next" onClick={onNext} />
    </div>
  );
}

export default ThirdTripPageForm;
