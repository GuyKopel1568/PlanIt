import React, { useState } from 'react';
import CountryAndCitiesDropdowns from '../CountryAndCityDropdown';
import Calendar from '../Calendar';
import AirportSelector from '../AirportSelector';

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
      <h3>Where do you want to go?</h3>
      <form className="flex justify-between gap-4">
        <CountryAndCitiesDropdowns
          onCountryChange={handleCountryChange}
          onCityChange={handleCityChange}
        />

        <Calendar onDateChange={handleDateChange} />

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
      </form>

      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default SecondTripPageForm;
