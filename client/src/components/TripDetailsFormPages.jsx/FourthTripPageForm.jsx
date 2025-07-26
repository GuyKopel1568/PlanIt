import React from 'react';
import TransportationMode from '../TransportationMode';
import FormButton from '../../UI/FormButton';
import AvgDistance from '../AvgDistance';
import AvgTime from '../AvgTime';
import StarTrip from '../StarTrip';
import MustAttractions from '../MustAttractions';

function FourthTripPageForm({ onNext, onBack, tripData, setTripData }) {
  return (
    <div className="flex flex-col pr-10 pl-10">
      <h3>Transportation Preferences</h3>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 ">
          <TransportationMode
            transportationData={tripData.transportationMode}
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, transportationMode: value }))
            }
            setTripData={setTripData}
          />
          <AvgDistance
            avgDistanceData={tripData.avgDistance}
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, avgDistance: value }))
            }
            setTripData={setTripData}
          />
          <AvgTime
            avgTimeData={tripData.avgTime}
            onChange={(setTripData) => (value) =>
              setTripData((prev) => ({ ...prev, avgTime: value }))
            }
            setTripData={setTripData}
          />
        </div>
        <div className="flex flex-col gap-4">
          <StarTrip
            startTripData={tripData.isStarTrip}
            setTripData={setTripData}
          />
          <MustAttractions
            mustAttractionsData={tripData.mustAttractions}
            onChange={setTripData}
            setTripData={setTripData}
          />
        </div>
      </div>
      <div className="flex justify-evenly px-30 pt-4">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default FourthTripPageForm;
