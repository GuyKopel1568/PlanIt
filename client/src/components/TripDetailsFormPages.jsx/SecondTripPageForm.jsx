import React from 'react';
import CountryAndCitiesDropdowns from '../CountryAndCityDropdown';
import Calendar from '../Calendar';
import AirportSelector from '../AirportSelector';
import FormButton from '../../UI/FormButton';

function SecondTripPageForm({ onNext, onBack, tripData, setTripData }) {
  const handleCountryChange = (countries) => {
    setTripData((prev) => ({
      ...prev,
      selectedCountries: countries,
      selectedCities: [],
    }));
  };

  const handleCityChange = (cities) => {
    setTripData((prev) => ({
      ...prev,
      selectedCities: cities,
    }));
  };

  const handleLandingAirportChange = (airport) => {
    setTripData((prev) => ({
      ...prev,
      selectedAirport: {
        ...prev.selectedAirport,
        landingAirport: airport,
      },
    }));
  };

  const handleDepartureAirportChange = (airport) => {
    setTripData((prev) => ({
      ...prev,
      selectedAirport: {
        ...prev.selectedAirport,
        departureAirport: airport,
      },
    }));
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setTripData((prev) => ({
      ...prev,
      selectedDates: [{ startDate, endDate }],
    }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <h3 className="font-bold text-sky-900 text-center">
          Where do you want to go?
        </h3>
      </div>

      <div className="flex flex-col 2xl:flex-row justify-between gap-6 ">
        {/* Countries & Cities */}
        <div
          className={` ${tripData.selectedCountries.length > 0 ? 'lg:w-1/3' : 'lg:w-1/2'}`}
        >
          <CountryAndCitiesDropdowns
            onCountryChange={handleCountryChange}
            onCityChange={handleCityChange}
            selectedCountries={tripData.selectedCountries}
            selectedCities={tripData.selectedCities}
            setTripData={setTripData}
          />
        </div>

        {/* Airports */}
        {tripData.selectedCountries.length > 0 && (
          <div className="lg:w-1/3">
            <div className="flex flex-col gap-6 shadow-2xl p-4 rounded-4xl bg-white w-full">
              <AirportSelector
                text="Select landing Airport"
                selectedCountries={tripData.selectedCountries}
                selectedAirport={tripData.selectedAirport.landingAirport}
                onAirportChange={handleLandingAirportChange}
              />
              <AirportSelector
                text="Select departure Airport"
                selectedCountries={tripData.selectedCountries}
                selectedAirport={tripData.selectedAirport.departureAirport}
                onAirportChange={handleDepartureAirportChange}
              />
            </div>
          </div>
        )}

        {/* Calendar */}
        <div
          className={`${tripData.selectedCountries.length > 0 ? 'lg:w-1/3 2xl:w-1/3' : 'lg:w-1/2 2xl:w-1/2 '}`}
        >
          <Calendar
            onDateChange={handleDateChange}
            selectedCountries={tripData.selectedCountries}
            selectedDates={tripData.selectedDates}
          />
        </div>
      </div>

      <div className="flex justify-evenly px-30 pt-2">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default SecondTripPageForm;
