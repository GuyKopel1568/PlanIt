import React from 'react';
import ImageCarousel from '../ui/ImageCarousel';

function TripInfo({
  trip,
  onSelect,
  tripInfoWidth = '100%',
  tripInfoHeight = '95vh',
}) {
  if (!trip) return null;

  const countries = Array.isArray(trip.selectedCountries)
    ? trip.selectedCountries
    : [];
  const countryImages = countries.map((c) => {
    const slug = (c.label || '').toLowerCase().replace(/\s+/g, '-');
    return {
      src: `/countries/${slug}.jpg`,
      alt: c.label || 'Country',
    };
  });

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg h-full overflow-auto"
      style={{ width: tripInfoWidth, height: tripInfoHeight }}
    >
      {countryImages.length > 0 ? (
        <ImageCarousel images={countryImages} className="mb-4" />
      ) : (
        <img
          src="/countries/_default.jpg"
          alt="Default"
          className="w-full h-56 md:h-96 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="font-semibold mb-2">Countries</h3>
      {countries.length ? (
        <ul className="list-disc pl-5 mb-4">
          {countries.map((c) => (
            <li key={c._id || c.value || c.label}>{c.label}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No countries selected.</p>
      )}

      {trip.description && (
        <p className="mb-4 text-gray-700">{trip.description}</p>
      )}

      <button
        onClick={() => onSelect?.(null)}
        className="px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
}

export default TripInfo;
