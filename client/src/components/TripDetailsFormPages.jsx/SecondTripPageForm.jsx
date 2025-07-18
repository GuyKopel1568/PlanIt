import React, { useState } from 'react';
import CountryAndCitiesDropdowns from '../CountryAndCityDropdown';
import Calendar from '../Calendar';
import AirportSelector from '../AirportSelector';
import FormButton from '../FormButton';

function SecondTripPageForm({ onNext, onBack }) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const [selectedAirport, setSelectedAirport] = useState({
    landingAirport: '',
    departureAirport: '',
  });

  const handleCountryChange = (countries) => {
    setSelectedCountries(countries);
    setSelectedCities([]);
    console.log('Selected countries:', countries);
  };

  const handleCityChange = (cities) => {
    setSelectedCities(cities);
    console.log('Selected cities:', cities);
  };

  const handleLandingAirportChange = (airport) => {
    setSelectedAirport((prev) => ({
      ...prev,
      landingAirport: airport,
    }));
    console.log('Selected landing airport:', airport);
  };

  const handleDepartureAirportChange = (airport) => {
    setSelectedAirport((prev) => ({
      ...prev,
      departureAirport: airport,
    }));
    console.log('Selected departure airport:', airport);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setSelectedDates(startDate, endDate);
    console.log('Selected dates:', startDate, endDate);
  };

  return (
    <div>
      <div className="flex flex-col items-center ">
        <h3>Where do you want to go?</h3>
      </div>
      <form className="grid gap-4 grid-cols-3 h-[40vh] pr-20">
        <div className="flex flex-col gap-6 col-span-2">
          <CountryAndCitiesDropdowns
            className="w-full"
            onCountryChange={handleCountryChange}
            onCityChange={handleCityChange}
          />

          {selectedCountries.length > 0 && (
            <div className="flex justify-evenly gap-6 shadow-2xl p-4 rounded-4xl h-[12vh]">
              <AirportSelector
                text="Select landing Airport"
                selectedCountries={selectedCountries}
                selectedAirport={selectedAirport.landingAirport}
                onAirportChange={handleLandingAirportChange}
              />

              <AirportSelector
                text="Select departure Airport"
                selectedCountries={selectedCountries}
                selectedAirport={selectedAirport.departureAirport}
                onAirportChange={handleDepartureAirportChange}
              />
            </div>
          )}
        </div>
        <div>
          <Calendar onDateChange={handleDateChange} />
        </div>
      </form>
      <div className="flex justify-between">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default SecondTripPageForm;
