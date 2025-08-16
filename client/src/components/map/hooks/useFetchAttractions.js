import { useEffect, useState } from 'react';
import { getTopAttractions as fetchTopAttractions } from '../../../api/trips';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function useFetchAttractions(tripCities, limit) {
  const [pins, setPins] = useState([]);
  const [firstCenter, setFirstCenter] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const acc = [];
      let first = null;

      for (let i = 0; i < tripCities.length; i += 1) {
        const city = tripCities[i];
        if (i > 0) await sleep(150);
        try {
          const data = await fetchTopAttractions(city);
          const places = data?.results || [];

          if (!first && data?.center) first = data.center;

          const pinsForCity = places
            .filter((p) => p?.location?.lat && p?.location?.lng)
            .slice(0, limit)
            .map((p, idx) => ({
              city,
              name: p.name || 'Attraction',
              lat: p.location.lat,
              lng: p.location.lng,
              rating: p.rating || 0,
              order: idx + 1,
            }));

          console.log(`Top attractions for ${city}:`, pinsForCity);
          acc.push(...pinsForCity);
        } catch (e) {
          console.error(`Failed to fetch attractions for ${city}:`, e);
        }
      }

      if (!cancelled) {
        setPins(acc);
        setFirstCenter(first);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tripCities?.join('|'), limit]);

  return { pins, firstCenter };
}
