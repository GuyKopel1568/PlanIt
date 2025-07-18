import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import cc from 'countries-cities';

function CountryAndCityDropdown({ onCountryChange, onCityChange }) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
    setSelectedCities([]);
    onCountryChange(selected);
  };

  const handleCityChange = (selected) => {
    setSelectedCities(selected);
    onCityChange(selected);
  };

  const formatOptionLabel = ({ label, value }) => (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/w40/${value.toLowerCase()}.png`}
        alt={label}
        className="w-5 h-4"
      />
      {label}
    </div>
  );

  // Create city options from selected countries
  const cityOptions = selectedCountries.flatMap((country) => {
    const cities = cc.getCities(country.label) || [];
    return cities.map((city) => ({
      label: city,
      value: city,
    }));
  });

  return (
    <div className="flex flex-col gap-6 w-[30vw] ">
      <Select
        options={countryOptions}
        value={selectedCountries}
        onChange={handleCountryChange}
        isMulti
        formatOptionLabel={formatOptionLabel}
        placeholder="Select countries"
        closeMenuOnSelect={false}
      />

      {selectedCountries.length > 0 && cityOptions.length > 0 && (
        <Select
          options={cityOptions}
          value={selectedCities}
          onChange={handleCityChange}
          isMulti
          placeholder={
            selectedCountries.length === 0
              ? 'Select countries first'
              : 'Select cities'
          }
          closeMenuOnSelect={false}
        />
      )}
    </div>
  );
}

export default CountryAndCityDropdown;
