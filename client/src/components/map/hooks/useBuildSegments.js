import React, { useEffect, useState } from 'react';

export default function useBuildSegments({
  tripCities,
  landing,
  departure,
  includeAirports,
  optimize,
  pinsByCity,
}) {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const g = window.google;
    if (!g?.maps || !tripCities?.length) {
      setSegments([]);
      return;
    }

    let cancelled = false;
    setSegments([]);

    (async () => {
      const results = [];

      for (let i = 0; i < tripCities.length; i += 1) {
        const city = tripCities[i];
        const nextHop =
          i < tripCities.length - 1
            ? tripCities[i + 1]
            : includeAirports && departure
              ? departure
              : city;

        const origin = i === 0 && includeAirports && landing ? landing : city;

        const waypoints = (pinsByCity[city] || []).map((p) => ({
          location: new g.maps.LatLng(p.lat, p.lng),
          stopover: true,
        }));

        const svc = new g.maps.DirectionsService();
        const segDirections = await new Promise((resolve) => {
          svc.route(
            {
              origin,
              destination: nextHop,
              waypoints,
              optimizeWaypoints: Boolean(optimize),
              travelMode: g.maps.TravelMode.DRIVING,
              provideRouteAlternatives: false,
            },
            (result, status) => {
              if (status === 'OK' && result) resolve(result);
              else {
                console.warn(
                  `Segment route error (${origin} -> ${nextHop})`,
                  status
                );
                resolve(null);
              }
            }
          );
        });

        if (!cancelled && segDirections) {
          results.push(segDirections);
          setSegments((prev) => [...prev, segDirections]); // progressive render
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tripCities?.join('|'),
    landing,
    departure,
    includeAirports,
    optimize,
    JSON.stringify(pinsByCity),
  ]);

  return { segments };
}
