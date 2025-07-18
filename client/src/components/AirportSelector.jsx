import React from 'react';
import Select from 'react-select';
import airportData from 'airport-data';

function AirportSelector({
  text,
  selectedCountries,
  selectedAirport,
  onAirportChange,
}) {
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
    <div className="w-[30vw]">
      <label className="block mb-2 font-semibold">{text}</label>
      <Select
        options={airportOptions}
        value={selectedAirport}
        onChange={onAirportChange}
        placeholder={text}
      />
    </div>
  );
}

export default AirportSelector;
