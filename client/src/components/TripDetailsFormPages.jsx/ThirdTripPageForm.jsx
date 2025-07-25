import React from 'react';
import FormButton from '../../UI/FormButton';
import AdultsNumber from '../AdultsNumber';
import TripBudget from '../TripBudget';
import KidsNumber from '../KidsNumber';
import AccommodationType from '../AccommodationType';
import TripType from '../TripType';

function ThirdTripPageForm({ onNext, onBack, tripData, setTripData }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-xl font-semibold mb-4">
        Help us plan your trip — who’s going, what’s your style?
      </h4>

      <form className="flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 shadow-2xl p-8 rounded-4xl bg-white flex-1 h-[50%]">
            <AdultsNumber
              adultsData={tripData.adultNumber}
              onChange={(value) =>
                setTripData((prev) => ({ ...prev, adultNumber: value }))
              }
            />
            <KidsNumber
              kidsData={tripData.kidsNumber}
              onChange={(value) =>
                setTripData((prev) => ({ ...prev, kidsNumber: value }))
              }
            />
            <TripBudget
              budgetData={tripData.budget}
              onChange={(value) =>
                setTripData((prev) => ({ ...prev, budget: value }))
              }
            />
          </div>

          <div className="flex flex-col gap-4 shadow-2xl p-2 rounded-4xl bg-white flex-1 h-[58vh]">
            <AccommodationType
              accommodationType={tripData.accommodationType}
              onChange={(value) =>
                setTripData((prev) => ({ ...prev, accommodationType: value }))
              }
            />
            <TripType
              tripType={tripData.tripType}
              onChange={(value) =>
                setTripData((prev) => ({ ...prev, tripType: value }))
              }
              tripData={tripData}
              setTripData={setTripData}
            />
          </div>
        </div>

        <div className="flex justify-evenly px-30">
          <FormButton text="Back" onClick={onBack} />
          <FormButton text="Next" onClick={onNext} />
        </div>
      </form>
    </div>
  );
}

export default ThirdTripPageForm;
