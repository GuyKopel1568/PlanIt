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
      <div className="flex flex-col items-center  ">
        <h3>Where do you want to go?</h3>
      </div>
      <form className="flex justify-between gap-4 pr-5 pl-5 ">
        <div className="flex gap-2 ">
          <CountryAndCitiesDropdowns
            onCountryChange={handleCountryChange}
            onCityChange={handleCityChange}
          />

          {selectedCountries.length > 0 && (
            <div className="flex flex-col h-[42vh] gap-8 shadow-2xl p-4 rounded-4xl bg-white ">
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
      <div className="flex justify-between p-8">
        <FormButton text="Back" onClick={onBack} />
        <FormButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}

export default SecondTripPageForm;
