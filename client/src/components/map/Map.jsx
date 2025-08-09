import React, { useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from '@react-google-maps/api';

import darkMapStyle from './darkModeMap.json';
import lightMapStyle from './lightModeMap.json';

const containerStyle = {
  width: '30vw',
  height: '95vh',
  direction: 'rtl',
  position: 'absolute',
  top: 10,
  right: 10,
  borderRadius: '8px',
  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.705)',
};

const defaultCenter = {
  lat: 32.0853,
  lng: 34.7818,
};

function Map({ onPlaceSelect }) {
  const theme = localStorage.getItem('theme');
  const isDarkMode = theme === 'dark';

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const [markerPosition, setMarkerPosition] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace?.();
    if (!place || !place.place_id || !mapRef.current) {
      console.warn('Invalid place selection');
      return;
    }

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.getDetails(
      {
        placeId: place.place_id,
        fields: [
          'name',
          'rating',
          'formatted_phone_number',
          'formatted_address',
          'opening_hours',
          'geometry',
          'photos',
          'website',
        ],
      },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();

          setCenter({ lat, lng });
          setMarkerPosition({ lat, lng });

          onPlaceSelect(result);
        }
      }
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      {/* <div className="mb-2 px-2">
        <Autocomplete
          onLoad={(auto) => (autocompleteRef.current = auto)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search for an attraction..."
            className="p-2 border rounded w-full max-w-md"
          />
        </Autocomplete>
      </div> */}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onMapLoad}
        options={{
          styles: isDarkMode ? darkMapStyle : lightMapStyle,
          disableDefaultUI: true,
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
