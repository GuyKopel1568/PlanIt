import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import cc from 'countries-cities';
import '../styles/CountryAndCityDropdown.css';

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
        className="w-6 h-5 rounded-full"
      />
      {label}
    </div>
  );

  const cityOptions = selectedCountries.flatMap((country) => {
    const cities = cc.getCities(country.label) || [];
    return cities.map((city) => ({
      label: city,
      value: city,
    }));
  });

  return (
    <div
      className={`
        ${cityOptions.length === 0 ? 'h-[16vh] md:h-[18vh] ' : 'h-[34vh] md:h-[36vh] sm:h-[38vh] xs:h-[40vh]'}
        sm:w-[70vw] md:w-[55vw] lg:w-[25vw]
        flex flex-col gap-6 shadow-2xl p-4 rounded-4xl bg-white
      `}
    >
      <div className="shadow-2xl p-4 rounded-4xl bg-white">
        <p className="mb-2 font-medium">Select your countries destination</p>
        <Select
          options={countryOptions}
          value={selectedCountries}
          onChange={handleCountryChange}
          isMulti
          classNamePrefix="rs"
          formatOptionLabel={formatOptionLabel}
          placeholder="Select countries"
          closeMenuOnSelect={false}
          styles={{
            menuList: (base) => ({
              ...base,
              maxHeight: '15vh',
              overflowY: 'auto',
            }),
          }}
        />
      </div>

      {/* City Selector */}
      {selectedCountries.length > 0 && cityOptions.length > 0 && (
        <div className="shadow-2xl p-4 rounded-4xl bg-white">
          <p className="mb-2 font-medium">Select your cities destination</p>
          <Select
            options={cityOptions}
            value={selectedCities}
            onChange={handleCityChange}
            isMulti
            classNamePrefix="rs"
            placeholder="Select cities"
            closeMenuOnSelect={false}
            styles={{
              menuList: (base) => ({
                ...base,
                maxHeight: '15vh',
                overflowY: 'auto',
              }),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CountryAndCityDropdown;
