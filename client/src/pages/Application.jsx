import { useState, useEffect } from 'react';
import Map from '../components/map/Map';
import TripContainer from '../components/application/TripContainer';
import { getUserTrips } from '../api/trips';
import AddTrip from '../components/application/AddTrip.jsx';
import TripInfo from '../components/application/TripInfo.jsx';
import Navbar from '../components/application/Navbar.jsx';

function Application() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = async () => {
    const list = await getUserTrips();
    setTrips(list || []);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6 grid grid-cols-[minmax(0,1fr)_30vw]">
        {!selectedTrip && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
            {trips.map((trip) => (
              <TripContainer
                key={trip._id || trip.id}
                trip={trip}
                onSelect={setSelectedTrip}
              />
            ))}
            <AddTrip />
          </div>
        )}
        {selectedTrip && (
          <TripInfo
            trip={selectedTrip}
            onSelect={setSelectedTrip}
            tripInfoWidth="35vw"
            tripInfoHeight="95vh"
          />
        )}

        <div className="rounded-lg shadow-lg">
          <Map
            selectedTrip={selectedTrip}
            includeAirports={false}
            optimize={false}
            mapWidth={selectedTrip ? '60vw' : '30vw'}
            mapHeight="95vh"
          />
        </div>
      </div>
    </div>
  );
}

export default Application;
