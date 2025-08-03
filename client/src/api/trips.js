export async function saveTrip(tripData) {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('No authentication token found');

    const res = await fetch('http://localhost:5000/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
