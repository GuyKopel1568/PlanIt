import React, { useState } from 'react';
import FormButton from '../../UI/FormButton';
import { saveTrip } from '../../api/trips';

function FifthTripPageForm({ onBack, tripData }) {
  const [loading, setLoading] = useState(false);

  console.log('Trip Data:', tripData);

  const countries = tripData.selectedCountries.map((c) => c.label).join(', ');
  const cities = tripData.selectedCities
    .map((c) => c.label || c.name)
    .join(', ');
  const startDate = tripData.selectedDates[0]?.startDate?.toLocaleDateString();
  const endDate = tripData.selectedDates[0]?.endDate?.toLocaleDateString();
  const landingAirport =
    tripData.selectedAirport.landingAirport?.label || 'Not selected';
  const departureAirport =
    tripData.selectedAirport.departureAirport?.label || 'Not selected';
  const adultsNumber = tripData.adultsNumber || 0;
  const kidsNumber = tripData.kidsNumber || 0;
  const tripBudget = tripData.tripBudget || 'Not specified';
  const accommodationType = tripData.accommodationType || 'Not specified';
  const tripTypes = tripData.tripType.join(', ');
  const avgTime = tripData.avgTime || 'Not specified';
  const transportation = tripData.transportationMode || 'Not specified';
  const avgKm = tripData.avgDistance || 'Not specified';
  const starTrip = tripData.isStarTrip ? 'Yes' : 'No';
  const avgAttractionsPerDay = tripData.numberAttractionsAvg || 'Not specified';
  const mustAttractions = tripData.mustAttractions || 'Not specified';

  const InfoBox = ({ label, value }) => (
    <div className="shadow-2xl p-4 rounded-4xl bg-white">
      <p className="text-sky-600">
        {label}: <span className="text-stone-600">{value}</span>
      </p>
    </div>
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await saveTrip(tripData);
      alert('Trip saved successfully!');
      console.log('Saved trip:', result);
    } catch (err) {
      alert('Failed to save trip.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-h-[70vh] overflow-y-auto pr-2">
      <h3 className="text-3xl font-bold">Summary</h3>

      <div className="flex justify-between w-full gap-4">
        {/* Left column */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="shadow-2xl p-4 rounded-4xl bg-white flex flex-col gap-4">
            <p className="font-semibold text-sky-900">Destination details</p>
            {InfoBox({ label: 'Countries', value: countries })}
            {InfoBox({ label: 'Cities', value: cities })}
            <div className="flex gap-4">
              {InfoBox({ label: 'Landing airport', value: landingAirport })}
              {InfoBox({ label: 'Departure airport', value: departureAirport })}
            </div>
            <div className="flex gap-4">
              {InfoBox({ label: 'Start date', value: startDate })}
              {InfoBox({ label: 'End date', value: endDate })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="shadow-2xl p-4 rounded-4xl bg-white">
            <p className="font-semibold text-sky-900">
              Transportation Preferences
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {InfoBox({ label: 'Transportation mode', value: transportation })}
              {InfoBox({ label: 'Star trip', value: starTrip })}
              {InfoBox({ label: 'Average travel time', value: avgTime })}
              {InfoBox({
                label: 'Avg. attractions/day',
                value: avgAttractionsPerDay,
              })}
              {InfoBox({ label: 'Average distance', value: avgKm })}
              {InfoBox({ label: 'Must attractions', value: mustAttractions })}
            </div>
          </div>

          <div className="shadow-2xl p-4 rounded-4xl bg-white">
            <p className="font-semibold text-sky-900">Plan your trip</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {InfoBox({ label: 'Adults number', value: adultsNumber })}
              {InfoBox({ label: 'Kids number', value: kidsNumber })}
              {InfoBox({ label: 'Trip budget', value: tripBudget })}
              {InfoBox({
                label: 'Accommodation type',
                value: accommodationType,
              })}
              {InfoBox({ label: 'Trip type', value: tripTypes })}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 flex gap-4">
        <FormButton text="Back" onClick={onBack} />
        <FormButton
          text={loading ? 'Saving...' : 'Save Trip'}
          onClick={handleSave}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default FifthTripPageForm;
