import React, { useEffect, useMemo } from 'react';
import Select from 'react-select';
import airportData from 'airport-data';

function AirportSelector({
  text,
  selectedCountries = [],
  selectedAirport,
  onAirportChange,
}) {
  const hasCountries =
    Array.isArray(selectedCountries) && selectedCountries.length > 0;

  // Always call hooks (no early return before this)
  useEffect(() => {
    if (!hasCountries) onAirportChange?.(null);
  }, [hasCountries, onAirportChange]);

  const airportOptions = useMemo(() => {
    if (!hasCountries) return [];

    // helpers
    const normName = (s = '') =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/^the\s+/, '');
    const normCode = (s = '') => s.toString().trim().toUpperCase();

    const allowedNames = new Set(
      selectedCountries.map((c) => normName(c.label))
    );
    const allowedCodes = new Set(
      selectedCountries.map((c) => normCode(c.value))
    ); // e.g., "NL", "CH"

    const getAirportCountryName = (a) =>
      a.country_name ?? a.countryName ?? a.country ?? a.country_full ?? '';
    const getAirportCountryCode = (a) =>
      a.iso_country ?? a.countryCode ?? a.iso ?? a.cc ?? '';

    const seen = new Set();
    const options = [];

    for (const a of airportData) {
      const iata = a.iata || a.iata_code;
      if (!iata || iata.length !== 3) continue;
      if (a.type === 'closed') continue;

      const name = normName(getAirportCountryName(a));
      const code = normCode(getAirportCountryCode(a));

      const match =
        (name && allowedNames.has(name)) || (code && allowedCodes.has(code));
      if (!match) continue;

      if (seen.has(iata)) continue;
      seen.add(iata);

      const city = a.city || a.municipality || '';
      const label = `${a.name} (${iata})${city ? ` – ${city}` : ''}`;

      options.push({ label, value: iata, meta: { code, name, city } });
    }

    options.sort((x, y) => x.label.localeCompare(y.label));
    return options;
  }, [hasCountries, selectedCountries]);

  // It's fine to early-return after hooks have been called
  if (!hasCountries) return null;

  return (
    <div className="flex flex-col max-w-[24vw] shadow-2xl p-4 rounded-3xl">
      <p className="mb-2 font-medium">{text}</p>
      <Select
        className="w-full font-semibold text-base"
        classNamePrefix="airport"
        options={airportOptions}
        value={selectedAirport}
        onChange={onAirportChange}
        placeholder={text}
        isClearable
        styles={{
          menu: (base) => ({ ...base, zIndex: 50 }),
          menuList: (base) => ({
            ...base,
            maxHeight: '220px',
            overflowY: 'auto',
          }),
          option: (base) => ({ ...base, whiteSpace: 'normal' }),
        }}
        noOptionsMessage={() => 'No airports in selected countries'}
      />
    </div>
  );
}

export default AirportSelector;
