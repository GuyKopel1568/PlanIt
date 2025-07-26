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
    console.log('Selected countries:', countries);
  };

  const handleCityChange = (cities) => {
    setTripData((prev) => ({
      ...prev,
      selectedCities: cities,
    }));
    console.log('Selected cities:', cities);
  };

  const handleLandingAirportChange = (airport) => {
    setTripData((prev) => ({
      ...prev,
      selectedAirport: {
        ...prev.selectedAirport,
        landingAirport: airport,
      },
    }));
    console.log('Selected landing airport:', airport);
  };

  const handleDepartureAirportChange = (airport) => {
    setTripData((prev) => ({
      ...prev,
      selectedAirport: {
        ...prev.selectedAirport,
        departureAirport: airport,
      },
    }));
    console.log('Selected departure airport:', airport);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setTripData((prev) => ({
      ...prev,
      selectedDates: [{ startDate, endDate }],
    }));
    console.log('Selected dates:', startDate, endDate);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-4xl font-bold text-sky-900">
          Where do you want to go?
        </h3>
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <CountryAndCitiesDropdowns
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              selectedCountries={tripData.selectedCountries}
              selectedCities={tripData.selectedCities}
              setTripData={setTripData}
            />
          </div>

          {tripData.selectedCountries.length > 0 && (
            <div className="flex-1 flex flex-col justify-evenly lg:h-[32vh] md:h-[36vh] gap-6 shadow-2xl p-4 rounded-4xl bg-white">
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
          )}

          <div className="flex-1">
            <Calendar
              onDateChange={handleDateChange}
              selectedCountries={tripData.selectedCountries}
              selectedDates={tripData.selectedDates}
            />
          </div>
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
