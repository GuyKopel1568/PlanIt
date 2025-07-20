import React, { useState } from 'react';
import CountryAndCitiesDropdowns from '../CountryAndCityDropdown';
import Calendar from '../Calendar';
import AirportSelector from '../AirportSelector';
import FormButton from '../../UI/FormButton';

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
    setSelectedDates([{ startDate, endDate }]);
    console.log('Selected dates:', startDate, endDate);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-4xl font-bold text-sky-900">
          Where do you want to go?
        </h3>
      </div>

      <form className="flex flex-col gap-2 ">
        <div className="flex justify-evenly flex-wrap">
          <CountryAndCitiesDropdowns
            onCountryChange={handleCountryChange}
            onCityChange={handleCityChange}
          />

          {selectedCountries.length > 0 && (
            <div className="flex flex-col lg:h-[38vh] md:h-[36vh]  gap-6 shadow-2xl p-4 rounded-4xl bg-white min-w-[20vw]">
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

          <Calendar onDateChange={handleDateChange} />
        </div>

        <div className="flex justify-between pt-8 px-30">
          <FormButton text="Back" onClick={onBack} />
          <FormButton text="Next" onClick={onNext} />
        </div>
      </form>
    </div>
  );
}

export default SecondTripPageForm;
