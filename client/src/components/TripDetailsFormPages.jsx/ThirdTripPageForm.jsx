import React, { useState } from 'react';
import FormButton from '../../UI/FormButton';
import AdultsNumber from '../AdultsNumber';
import TripBudget from '../TripBudget';
import KidsNumber from '../KidsNumber';
import AccommodationType from '../AccommodationType';
import TripType from '../TripType';

function ThirdTripPageForm({ onNext, onBack }) {
  const [budget, setBudget] = useState(0);
  const [adultNumber, setAdultNumber] = useState(2);
  const [tripType, setTripType] = useState([]);
  const [accommodationType, setAccommodationType] = useState('basic');
  const [kidsNumber, setKidsNumber] = useState(0);

  console.log('Budget:', budget);
  console.log('People Number:', adultNumber);
  console.log('Trip Type:', tripType);
  console.log('Accommodation Type:', accommodationType);
  console.log('Is Kids Included:', kidsNumber);

  return (
    <div className="flex flex-col">
      <h4> Help us plan your trip — who’s going, what’s your style?</h4>
      <form className="flex gap-4">
        <div className="flex flex-col gap-4 shadow-2xl p-8 rounded-4xl bg-white h-[34vh]">
          <AdultsNumber onChange={setAdultNumber} />
          <KidsNumber onChange={setKidsNumber} />
          <TripBudget onChange={setBudget} />
        </div>
        <div className="flex flex-col gap-4 shadow-2xl p-4 rounded-4xl bg-white h-[58vh]">
          <AccommodationType onChange={setAccommodationType} />
          <TripType onChange={setTripType} />
        </div>
      </form>
      <div className="flex justify-between ">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default ThirdTripPageForm;
