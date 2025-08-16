import { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import darkMapStyle from './darkModeMap.json';
import lightMapStyle from './lightModeMap.json';
import useTripCities from './hooks/useTripCities';
import useFetchAttractions from './hooks/useFetchAttractions';
import useBuildSegments from './hooks/useBuildSegments';
import AttractionMarkers from '../map/layers/AttractionMarkers';
import SegmentRoutes from '../map/layers/SegmentRoutes';

const defaultCenter = { lat: 32.0853, lng: 34.7818 };

export default function MapCore({
  selectedTrip,
  includeAirports,
  optimize,
  mapWidth = '30vw',
  mapHeight = '95vh',
}) {
  const containerStyle = {
    width: mapWidth,
    height: mapHeight,
    direction: 'rtl',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: '8px',
    boxShadow: '0 8px 12px rgba(0,0,0,0.705)',
  };

  const theme = localStorage.getItem('theme');
  const isDarkMode = theme === 'dark';

  const mapRef = useRef(null);
  const [center, setCenter] = useState(defaultCenter);

  const { tripCities, landing, departure, limit } = useTripCities(selectedTrip);

  const {
    pins, // [{city,name,lat,lng,rating,order}]
    firstCenter, // {lat,lng} להצבה ראשונית
  } = useFetchAttractions(tripCities, limit);

  const { segments } = useBuildSegments({
    tripCities,
    landing,
    departure,
    includeAirports,
    optimize,
    pinsByCity: pins.reduce((acc, p) => {
      (acc[p.city] ||= []).push(p);
      return acc;
    }, {}),
  });

  // קביעת מרכז התחלתי
  useEffect(() => {
    if (firstCenter) setCenter(firstCenter);
  }, [firstCenter]);

  // התאמת תצוגה לכל הפינים (אם אין עדיין segments שיתאימו bounds)
  useEffect(() => {
    const g = window.google;
    if (!mapRef.current || !pins?.length || segments.length) return;
    const bounds = new g.maps.LatLngBounds();
    pins.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
    mapRef.current.fitBounds(bounds);
  }, [pins, segments.length]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={(map) => (mapRef.current = map)}
      options={{
        styles: isDarkMode ? darkMapStyle : lightMapStyle,
        disableDefaultUI: true,
      }}
    >
      <SegmentRoutes segments={segments} mapRef={mapRef} />
      <AttractionMarkers pins={pins} />
    </GoogleMap>
  );
}
