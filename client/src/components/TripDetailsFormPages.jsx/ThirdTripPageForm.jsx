import React, { useState } from 'react';
import FormButton from '../../UI/FormButton';
import Peoplenumber from '../PeopleNumber';
import TripBudget from '../TripBudget';
import KidsInclude from '../KidsInclude';
import AccommodationType from '../AccommodationType';
import TripType from '../TripType';

function ThirdTripPageForm({ onNext, onBack }) {
  const [budget, setBudget] = useState(0);
  const [peopleNumber, setPeopleNumber] = useState(1);
  const [tripType, setTripType] = useState([]);
  const [accommodationType, setAccommodationType] = useState('basic');
  const [isKidsIncluded, setIsKidsIncluded] = useState(false);

  console.log('Budget:', budget);
  console.log('People Number:', peopleNumber);
  console.log('Trip Type:', tripType);
  console.log('Accommodation Type:', accommodationType);
  console.log('Is Kids Included:', isKidsIncluded);

  return (
    <div className="flex flex-col">
      <h4> Help us plan your trip — who’s going, what’s your style?</h4>
      <form className="flex gap-4">
        <div className="flex flex-col gap-4 shadow-2xl p-8 rounded-4xl bg-white h-[34vh]">
          <Peoplenumber onChange={setPeopleNumber} />
          <TripBudget onChange={setBudget} />
          <KidsInclude onChange={setIsKidsIncluded} />
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
