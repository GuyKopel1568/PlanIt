import React, { useState } from 'react';
import TransportationMode from '../TransportationMode';
import FormButton from '../../UI/FormButton';

function FourthTripPageForm({ onNext, onBack }) {
  const [transportationMode, setTransportationMode] = useState('');
  const [avgDisatance, setAvgDistance] = useState(0);
  const [avgTime, setAvgTime] = useState(0);

  return (
    <div className="flex flex-col">
      <h3>Transportation Preferences</h3>
      <TransportationMode />
      <AvgDistance />
      <AvgTime />
      <div className="flex justify-between pt-8 px-30">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default FourthTripPageForm;
