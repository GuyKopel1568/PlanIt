import React from 'react';
import FormButton from '../../UI/FormButton';

function FifthTripPageForm({ onBack, tripDetails }) {
  return (
    <div>
      <h3>Summary</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-30 ">
          <div className="shadow-2xl p-4 rounded-4xl bg-white mb-4">
            <p>Where are you going?</p>
            <p>
              Countries:{' '}
              {(tripDetails.selectedCountries &&
                tripDetails.selectedCountries.label.join(', ')) ||
                ''}
            </p>
            <p>
              Cities:{' '}
              {(tripDetails?.selectedCities &&
                tripDetails.selectedCities.join(', ')) ||
                ''}
            </p>
            <p>
              Dates:{' '}
              {tripDetails?.selectedDates &&
              tripDetails.selectedDates[0]?.startDate &&
              tripDetails.selectedDates[0]?.endDate
                ? `${tripDetails.selectedDates[0].startDate.toLocaleDateString()} - ${tripDetails.selectedDates[0].endDate.toLocaleDateString()}`
                : ''}
            </p>
            <p>
              Airport: {tripDetails?.selectedAirport?.landingAirport || ''} to{' '}
              {tripDetails?.selectedAirport?.departureAirport || ''}
            </p>
          </div>

          <div className="shadow-2xl p-4 rounded-4xl bg-white">
            <p>Transportation Preferences</p>
            <p>
              Preferred Airlines:{' '}
              {tripDetails?.preferredAirlines.join(', ') || ''}
            </p>
            <p>Seat Class: {tripDetails?.seatClass || ''}</p>
            <p>Transportation Mode: {tripDetails?.transportationMode || ''}</p>
            <p>Average Distance: {tripDetails?.avgDistance || ''}</p>
            <p>Average Time: {tripDetails?.avgTime || ''}</p>
            <p>Star Trip: {tripDetails?.isStarTrip ? 'Yes' : 'No'}</p>
            <p>
              Must Attractions:{' '}
              {(tripDetails?.mustAttractions &&
                tripDetails.mustAttractions.join(', ')) ||
                ''}
            </p>
          </div>
        </div>

        <div>
          <div className="shadow-2xl p-4 rounded-4xl bg-white">
            <p>Design your trip</p>
            <p>Budget: {tripDetails?.budget || ''}</p>
            <p>Adults: {tripDetails?.adultNumber || ''}</p>
            <p>Trip Type: {tripDetails?.tripType.join(', ') || ''}</p>
            <p>Accommodation: {tripDetails?.accommodationType || ''}</p>
          </div>
        </div>
      </div>

      <div className=" px-30 pt-4">
        <FormButton text="Back" onClick={onBack} />
      </div>
    </div>
  );
}

export default FifthTripPageForm;
