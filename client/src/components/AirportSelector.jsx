import React, { useEffect } from 'react';
import Select from 'react-select';
import airportData from 'airport-data';

function AirportSelector({
  text,
  selectedCountries,
  selectedAirport,
  onAirportChange,
}) {
  useEffect(() => {
    if (selectedCountries.length === 0) {
      onAirportChange(null);
    }
  }, [selectedAirport, selectedCountries.length, onAirportChange]);

  if (!selectedCountries || selectedCountries.length === 0) return null;

  const airportOptions = selectedCountries.flatMap((country) =>
    airportData
      .filter((a) => a.country === country.label && a.iata)
      .map((a) => ({
        label: `${a.name} (${a.iata})`,
        value: a.iata,
      }))
  );

  return (
    <div className="flex flex-col max-w-[24vw]  shadow-2xl p-4 rounded-4xl">
      <p>{text}</p>
      <Select
        className="w-full font-semibold text-lg"
        classNamePrefix="airport"
        options={airportOptions}
        value={selectedAirport}
        onChange={onAirportChange}
        placeholder={text}
        styles={{
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: '200px',
            overflowY: 'auto',
          }),
          option: (base) => ({
            ...base,
            whiteSpace: 'normal',
          }),
        }}
      />
    </div>
  );
}

export default AirportSelector;
