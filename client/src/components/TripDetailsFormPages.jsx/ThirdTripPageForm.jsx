import React, { useState } from 'react';
import FormButton from '../../UI/FormButton';

function ThirdTripPageForm({ onNext, onBack }) {
  const [budget, setBudget] = useState(0);
  const [peopleNumber, setPeopleNumber] = useState(1);
  const [transportMethod, setTransportMethod] = useState('');
  const [tripType, setTripType] = useState([]);
  const [accommodationType, setAccommodationType] = useState('basic');

  return (
    <div className="flex justify-between p-8">
      <FormButton text="Back" onClick={onBack} />
      <FormButton text="Next" onClick={onNext} />
    </div>
  );
}

export default ThirdTripPageForm;
