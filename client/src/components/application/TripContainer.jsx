import React from 'react';

function TripContainer({ trip }) {
  if (!trip?.selectedCountries?.length) return null;

  const firstCountry = trip.selectedCountries[0].label.toLowerCase();
  const imgSrc = `/countries/${firstCountry}.jpg`;

  return (
    <div className="relative w-[20vw] h-[30vh] group overflow-hidden rounded-lg shadow-md mb-6">
      {/* Image */}
      <img
        src={imgSrc}
        alt={firstCountry}
        className="w-full h-full object-cover"
      />

      <div
        className="
          absolute inset-0
          bg-white/20
          backdrop-blur-sm
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-60
        "
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="text-white text-base px-6 py-3 rounded ">
          {trip.selectedCountries.map((country, index) => (
            <span key={index}>
              {country.label}
              {index < trip.selectedCountries.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripContainer;
