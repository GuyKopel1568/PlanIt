import React, { useState } from 'react';
import TransportationMode from '../TransportationMode';
import FormButton from '../../UI/FormButton';
import AvgDistance from '../AvgDistance';
import AvgTime from '../AvgTime';
import StarTrip from '../StarTrip';
import MustAttractions from '../MustAttractions';

function FourthTripPageForm({ onNext, onBack }) {
  const [transportationMode, setTransportationMode] = useState('');
  const [avgDisatance, setAvgDistance] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [isStarTrip, setIsStarTrip] = useState(false);
  const [mustAttractions, setMustAttractions] = useState([]);

  console.log('Transportation Mode:', transportationMode);
  console.log('Average Distance:', avgDisatance);
  console.log('Average Time:', avgTime);
  console.log('Is Star Trip:', isStarTrip);
  console.log('Must-See Attractions:', mustAttractions);

  return (
    <div className="flex flex-col gap-6 pr-10 pl-10">
      <h3>Transportation Preferences</h3>
      <div className="flex gap-6 justify-between">
        <div className="flex flex-col gap-6">
          <TransportationMode onChange={setTransportationMode} />
          <AvgDistance onChange={setAvgDistance} />
          <AvgTime onChange={setAvgTime} />
        </div>
        <div className="flex flex-col gap-6">
          <StarTrip isStarTrip={isStarTrip} onChange={setIsStarTrip} />
          <MustAttractions onChange={setMustAttractions} />
        </div>
      </div>
      <div className="flex justify-between pt-8 px-30">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default FourthTripPageForm;
