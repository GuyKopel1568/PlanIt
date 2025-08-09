import { useState, useEffect } from 'react';
import Map from '../components/map/Map';
import AttractionData from '../components/application/AttractionData';
import TripContainer from '../components/application/TripContainer';
import { getUserTrips } from '../api/trips';
import AddTrip from '../components/application/AddTrip.jsx';

function Application() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    const trips = await getUserTrips();
    setTrips(trips);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="p-6 grid grid-cols-[minmax(0,1fr)_30vw] ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-3">
        {trips.map((trip) => (
          <TripContainer key={trip._id || trip.id} trip={trip} />
        ))}
        <AddTrip />
      </div>

      <div className="rounded-lg shadow-lg">
        <Map onPlaceSelect={setSelectedPlace} />
      </div>
    </div>
  );
}

export default Application;
