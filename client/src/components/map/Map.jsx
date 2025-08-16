import { LoadScript } from '@react-google-maps/api';
import MapCore from './MapCore';

export default function Map({
  selectedTrip,
  includeAirports = true,
  optimize = false,
  mapWidth,
  mapHeight,
}) {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places', 'geometry']}
    >
      <MapCore
        selectedTrip={selectedTrip}
        includeAirports={includeAirports}
        optimize={optimize}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
      />
    </LoadScript>
  );
}
