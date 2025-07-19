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

    const x = document.getElementsByClassName('css-1nmdiq5-menu');
    if (x.length > 0) {
      console.log(x[0].children);
    }
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

  // Create city options from selected countries
  const cityOptions = selectedCountries.flatMap((country) => {
    const cities = cc.getCities(country.label) || [];
    return cities.map((city) => ({
      label: city,
      value: city,
    }));
  });

  return (
    <div
      className={`${selectedCountries.length === 0 ? 'h-[20vh] w-[50vw]' : 'h-[42vh]'} flex w-[30vw]  flex-col gap-10 shadow-2xl p-4 rounded-4xl`}
    >
      <div className="shadow-2xl p-4 rounded-4xl">
        <p>Select your countries destination</p>
        <Select
          options={countryOptions}
          value={selectedCountries}
          onChange={handleCountryChange}
          isMulti
          classNamePrefix="rs"
          styles={{
            menuList: (base) => ({
              ...base,
              maxHeight: '15vh',
              overflowY: 'auto',
            }),
          }}
          formatOptionLabel={formatOptionLabel}
          placeholder="Select countries"
          closeMenuOnSelect={false}
        />
      </div>

      {selectedCountries.length > 0 && cityOptions.length > 0 && (
        <div className="shadow-2xl p-4 rounded-4xl">
          <p>Select your cities destination</p>
          <Select
            options={cityOptions}
            value={selectedCities}
            onChange={handleCityChange}
            isMulti
            classNamePrefix="rs"
            styles={{
              menuList: (base) => ({
                ...base,
                maxHeight: '15vh',
                overflowY: 'auto',
              }),
            }}
            placeholder={
              selectedCountries.length === 0
                ? 'Select countries first'
                : 'Select cities'
            }
            closeMenuOnSelect={false}
          />
        </div>
      )}
    </div>
  );
}

export default CountryAndCityDropdown;
