import React from 'react';
import ImageCarousel from '../../UI/ImageCarousel';

function TripContainer({ trip, onSelect }) {
  if (!trip?.selectedCountries?.length) return null;

  const images = trip.selectedCountries.map((c) => ({
    src: `/countries/${(c.label || '').toLowerCase().replace(/\s+/g, '-')}.jpg`,
    alt: c.label || 'Country',
  }));

  return (
    <div
      onClick={() => onSelect?.(trip)}
      className="relative w-[20vw] h-[30vh] group overflow-hidden rounded-lg shadow-md mb-6 cursor-pointer"
      title="Show route on map"
    >
      {images.length ? (
        <ImageCarousel
          images={images}
          className="w-full h-full"
          height="h-full"
        />
      ) : (
        <img
          src="/countries/_default.jpg"
          alt="Default"
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors duration-300 pointer-events-none" />

      <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-stone-100 text-xl px-6 font-bold py-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
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
