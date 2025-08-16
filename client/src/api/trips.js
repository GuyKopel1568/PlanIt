const TOKEN = localStorage.getItem('token');

export async function saveTrip(tripData) {
  try {
    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) throw new Error('No authentication token found');

    const res = await fetch('http://localhost:5000/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(tripData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to save trip');
    }

    return data;
  } catch (err) {
    console.error('Error saving trip:', err);
    throw err;
  }
}

export const getUserTrips = async () => {
  if (!TOKEN) throw new Error('No authentication token found');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const baseUrl = 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/api/trips`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${TOKEN}` },
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
      }
      throw new Error(
        data.message || data.error || `Failed to fetch trips (${res.status})`
      );
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    console.error('Error fetching trips:', err);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

export const getTopAttractions = async (cityName, limit = 4) => {
  const token = localStorage.getItem('token');
  const res = await fetch(
    `/api/trips/top-attractions?city=${encodeURIComponent(cityName)}&limit=${limit}`,
    {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      mode: 'cors',
    }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Failed: ${res.status}`);
  return data;
};

export const updateTrip = async (tripId, body) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/trips/${tripId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.message || data.error || 'Failed to update trip');
  return data.trip;
};

export const updateTripCityDays = async (trip, editedDaysMap) => {
  const nextCities = (trip.selectedCities || []).map((c, idx) => {
    const key = c._id || c.value || c.label || String(idx);
    const n = Number(editedDaysMap[key]);
    return { ...c, days: Number.isFinite(n) && n > 0 ? n : (c.days ?? 1) };
  });
  return updateTrip(trip._id, { selectedCities: nextCities });
};
