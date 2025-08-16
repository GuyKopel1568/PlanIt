import { useEffect } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';

export default function SegmentRoutes({ segments = [], mapRef }) {
  // fitBounds לסגמנט הראשון
  useEffect(() => {
    const g = window.google;
    if (!segments.length || !mapRef?.current) return;
    const bounds = segments[0]?.routes?.[0]?.bounds;
    if (bounds) mapRef.current.fitBounds(bounds);
  }, [segments, mapRef]);

  return segments.map((dir, idx) => (
    <DirectionsRenderer
      key={`seg-${idx}`}
      directions={dir}
      options={{
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeOpacity: 0.9,
          strokeWeight: 5,
        },
        preserveViewport: true,
      }}
    />
  ));
}
