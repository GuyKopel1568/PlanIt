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

  return (
    <div className="flex flex-col p-8">
      <form className="flex justify-evenly gap-4">
        <div className="flex flex-col gap-4 w-full"></div>
        <Peoplenumber />
        <TripBudget />
        <KidsInclude />

        <div className="flex flex-col gap-4 w-full">
          <AccommodationType />
          <TripType />
        </div>
      </form>
      <div className="flex justify-between">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default ThirdTripPageForm;
