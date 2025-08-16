import React, { useState } from 'react';
import ImageCarousel from '../../UI/ImageCarousel';
import CityDaysEditor from './CityDaysEditor';
import { PiAirplaneLandingFill } from 'react-icons/pi';
import { FaPlaneDeparture, FaArrowRight } from 'react-icons/fa';

function TripInfo({
  trip,
  onSelect,
  tripInfoWidth = '100%',
  tripInfoHeight = '95vh',
}) {
  const [localTrip, setLocalTrip] = useState(trip);

  const countries = Array.isArray(trip?.selectedCountries)
    ? trip.selectedCountries
    : [];
  const countryImages = countries.map((country) => ({
    src: `/countries/${(country.label || '').toLowerCase().replace(/\s+/g, '-')}.jpg`,
    alt: country.label || 'Country',
  }));
  const countryList = countries.map((country) => country.label).join(', ');

  return (
    <div
      className="p-4 bg-slate-600 rounded-lg shadow-lg h-full overflow-auto"
      style={{ width: tripInfoWidth, height: tripInfoHeight }}
    >
      <div className="relative overflow-hidden ">
        {countryImages.length ? (
          <ImageCarousel
            images={countryImages}
            className="w-full"
            height="h-[40vh]"
          />
        ) : (
          <img
            src="/countries/_default.jpg"
            alt="Default"
            className="w-full h-[30vh] object-cover"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/10 z-10" />
        <div className="pointer-events-none absolute inset-0 z-20 flex ">
          <div className="w-full p-4">
            <div className="inline-block max-w-full bg-transparent/10 backdrop-blur-sm ring-1 ring-white/10 rounded-xl px-4 py-3">
              <h5 className="text-white font-extrabold tracking-tight leading-tight text-3xl md:text-5xl">
                Welcome to your trip to {countryList}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly mb-4 mt-4 gap-3 border border-transparent shadow-md shadow-stone-600 p-8 rounded-lg">
        <div className="border border-transparent shadow-md shadow-stone-600 p-4 rounded-xl w-[10vw] text-center flex flex-col items-center justify-center bg-stone-100">
          <PiAirplaneLandingFill className="text-2xl mb-1" />
          <p>{trip?.selectedAirport?.landingAirport?.label || '—'}</p>
        </div>

        <FaArrowRight className="text-3xl text-white" />
        <FaArrowRight className="text-3xl text-white" />
        <FaArrowRight className="text-3xl text-white" />

        <div className="border border-transparent shadow-md shadow-stone-600 p-4 rounded-xl w-[10vw] text-center flex flex-col items-center justify-center bg-stone-100">
          <FaPlaneDeparture className="text-2xl mb-1" />
          <p>{trip?.selectedAirport?.departureAirport?.label || '—'}</p>
        </div>
      </div>

      <p className="mb-2">
        Select how many days you want to stay in each city:
      </p>

      <CityDaysEditor
        trip={localTrip}
        onSaved={(updatedTrip) => setLocalTrip(updatedTrip)}
      />

      <button
        onClick={() => onSelect?.(null)}
        className="mt-6 px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
}

export default TripInfo;
