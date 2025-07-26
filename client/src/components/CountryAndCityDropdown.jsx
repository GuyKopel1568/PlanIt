import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import cc from 'countries-cities';
import '../styles/CountryAndCityDropdown.css';

function CountryAndCityDropdown({
  onCountryChange,
  onCityChange,
  selectedCountries,
  selectedCities,
  setTripData,
}) {
  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (selected) => {
    setTripData((prev) => ({
      ...prev,
      selectedCountries: selected,
      selectedCities: [],
    }));
    onCountryChange(selected);
  };

  const handleCityChange = (selected) => {
    setTripData((prev) => ({
      ...prev,
      selectedCities: selected,
    }));
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
${
  cityOptions.length === 0
    ? 'h-[16vh] 2xl:h-[22vh] 3xl:h-[16vh]'
    : '2xl:h-[50vh] md:h-[36vh] lg:h-[38vh] xl:h-[36vh]'
}        flex flex-col justify-evenly gap-6 shadow-2xl p-4 rounded-4xl bg-white
      `}
    >
      <div className="shadow-2xl p-4 rounded-4xl bg-white text-xl font-medium gap-4 ">
        <p>Select your countries destination</p>
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
        <div className="shadow-2xl p-4 rounded-4xl bg-white text-xl font-medium w-full">
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
