import { useState } from 'react';
import TripContainer from './TripContainer';
import { getTopAttractions } from '../../api/trips';
import MapPanel from '../../components/map/Map';

export default function TripsBoard({ trips = [] }) {
  const [activeTrip, setActiveTrip] = useState(null);
  const [cityAttractions, setCityAttractions] = useState({});

  const handleSelectTrip = async (trip) => {
    setActiveTrip(trip);

    const cityNames = (trip.selectedCities || [])
      .map((c) => c.label || c.name)
      .filter(Boolean);
    const acc = {};

    for (const city of cityNames) {
      try {
        const data = await getTopAttractions(city);
        acc[city] = data;
        console.log(`Attractions for ${city}:`, data.results);
      } catch (err) {
        console.error(`Failed to fetch attractions for ${city}`, err);
      }
    }

    setCityAttractions(acc);
  };

  return (
    <div className="flex gap-6">
      <div className="flex flex-wrap gap-6">
        {trips.map((t) => (
          <TripContainer
            key={t._id || JSON.stringify(t)}
            trip={t}
            onSelect={handleSelectTrip}
          />
        ))}
      </div>

      {/* Map on the side (or place it wherever you want) */}
      <div className="flex-1 min-w-[40vw]">
        <MapPanel activeTrip={activeTrip} cityAttractions={cityAttractions} />
      </div>
    </div>
  );
}
