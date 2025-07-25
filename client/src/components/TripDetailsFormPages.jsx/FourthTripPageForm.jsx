import React, { useState } from 'react';
import TransportationMode from '../TransportationMode';
import FormButton from '../../UI/FormButton';
import AvgDistance from '../AvgDistance';
import AvgTime from '../AvgTime';
import StarTrip from '../StarTrip';
import MustAttractions from '../MustAttractions';

function FourthTripPageForm({ onNext, onBack, tripData, setTripData }) {
  return (
    <div className="flex flex-col gap-6 pr-10 pl-10">
      <h3>Transportation Preferences</h3>
      <div className="flex gap-6 justify-between">
        <div className="flex flex-col gap-6">
          <TransportationMode
            transportationData={tripData.transportationMode}
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, transportationMode: value }))
            }
            tripData={tripData}
            setTripData={setTripData}
          />
          <AvgDistance
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, avgDistance: value }))
            }
            tripData={tripData}
            setTripData={setTripData}
          />
          <AvgTime
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, avgTime: value }))
            }
            tripData={tripData}
            setTripData={setTripData}
          />
        </div>
        <div className="flex flex-col gap-6">
          <StarTrip
            onChange={setTripData}
            tripData={tripData}
            setTripData={setTripData}
          />
          <MustAttractions
            onChange={setTripData}
            tripData={tripData}
            setTripData={setTripData}
          />
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
