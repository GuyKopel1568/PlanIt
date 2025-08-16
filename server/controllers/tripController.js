// controllers/tripController.js
import axios from 'axios';
import Trip from '../models/Trip.js';

// ─────────────────────────── CRUD ───────────────────────────
export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip({ ...req.body, userId: req.userId });
    await newTrip.save();
    res
      .status(201)
      .json({ message: 'Trip created successfully', trip: newTrip });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripsByUserId = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userId: req.userId },
      { new: true }
    );
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip updated successfully', trip });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTrips = async (_req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching all trips:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripsByDestination = async (req, res) => {
  try {
    const { destination } = req.query;
    const trips = await Trip.find({
      destination: new RegExp(destination, 'i'),
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const trips = await Trip.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by date range:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────── Cache helpers ───────────────────────────
const cache = new Map();
function setCache(key, value, ttlMs = 1000 * 60 * 10) {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
}
function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

// ─────────────────────────── Attractions (Text Search → Details) ───────────────────────────
export async function getTopAttractions(req, res) {
  console.log(
    '=== getTopAttractions CALLED ===',
    req.method,
    req.originalUrl,
    req.query
  );

  const GOOGLE_KEY = process.env.GOOGLE_PLACES_SERVER_KEY;
  if (!GOOGLE_KEY) {
    return res
      .status(500)
      .json({ error: 'Server misconfigured: API key missing' });
  }

  try {
    const {
      city,
      country, // optional (e.g. "Netherlands" or "DE") to disambiguate
      region, // optional ccTLD bias like "nl"
      limit = 4,
      language = 'en', // use 'he' if you want Hebrew results
      details = 'true',
    } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'city query param is required' });
    }

    const cacheKey = JSON.stringify({
      city,
      country,
      region,
      limit,
      language,
      details,
      v: 'textsearch-v1',
    });
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    // 1) Places Text Search (no Geocoding API needed)
    const query = country
      ? `tourist attractions in ${city}, ${country}`
      : `tourist attractions in ${city}`;
    const params = {
      query,
      key: GOOGLE_KEY,
      language,
      type: 'tourist_attraction',
    };
    if (region) params.region = region;

    const textResp = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      { params }
    );
    const { status, error_message } = textResp.data || {};
    console.log('[textsearch] status:', status, error_message || '');

    if (status === 'REQUEST_DENIED' || status === 'OVER_QUERY_LIMIT') {
      return res.status(502).json({
        error: `Google Places Text Search error: ${status}`,
        details: error_message || null,
      });
    }
    const list = textResp.data?.results || [];
    if (!list.length) {
      return res
        .status(404)
        .json({ error: `No attractions found for "${city}"` });
    }

    // 2) Rank results by rating * log(1 + reviews) and take top N
    const score = (p) =>
      (p.rating || 0) * Math.log1p(p.user_ratings_total || 0);
    const top = list
      .filter((p) => p.geometry?.location)
      .sort((a, b) => score(b) - score(a))
      .slice(0, Number(limit));

    // 3) Compute a reasonable center (average of found attractions)
    const center = top.reduce(
      (acc, p) => {
        acc.lat += p.geometry.location.lat;
        acc.lng += p.geometry.location.lng;
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    center.lat /= top.length;
    center.lng /= top.length;

    // 4) Optional enrichment with Place Details
    let results;
    if (String(details) === 'true') {
      const detailsUrl =
        'https://maps.googleapis.com/maps/api/place/details/json';
      results = await Promise.all(
        top.map(async (p, idx) => {
          console.log(`  [details] ${idx + 1}/${top.length}:`, p.name);
          try {
            const d = await axios.get(detailsUrl, {
              params: {
                place_id: p.place_id,
                key: GOOGLE_KEY,
                language,
                fields: [
                  'place_id',
                  'name',
                  'rating',
                  'user_ratings_total',
                  'formatted_address',
                  'formatted_phone_number',
                  'geometry',
                  'opening_hours',
                  'website',
                  'url',
                  'photos',
                  'price_level',
                ].join(','),
              },
            });
            return normalizePlace(d.data?.result || {}, p, GOOGLE_KEY);
          } catch (e) {
            console.error(`  [details] failed for ${p.name}:`, e.message);
            return normalizePlace(null, p, GOOGLE_KEY);
          }
        })
      );
    } else {
      results = top.map((p) => normalizePlace(null, p, GOOGLE_KEY));
    }

    const payload = { city, center, count: results.length, results };
    setCache(cacheKey, payload);
    return res.json(payload);
  } catch (err) {
    console.error(
      '[getTopAttractions] ERROR:',
      err?.response?.data || err.message
    );
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function normalizePlace(details, textItem, GOOGLE_KEY) {
  const base = details || {};
  const nb = textItem || {};
  const loc = base.geometry?.location ||
    nb.geometry?.location || { lat: null, lng: null };

  const photoRef =
    (base.photos && base.photos[0]?.photo_reference) ||
    (nb.photos && nb.photos[0]?.photo_reference);

  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${GOOGLE_KEY}`
    : null;

  return {
    placeId: base.place_id || nb.place_id,
    name: base.name || nb.name,
    rating: base.rating ?? nb.rating ?? null,
    userRatingsTotal: base.user_ratings_total ?? nb.user_ratings_total ?? null,
    address:
      base.formatted_address || nb.formatted_address || nb.vicinity || null,
    phone: base.formatted_phone_number || null,
    website: base.website || null,
    googleMapsUrl: base.url || null,
    priceLevel: base.price_level ?? null,
    location: { lat: loc.lat, lng: loc.lng },
    photoUrl,
    openingHours: base.opening_hours?.weekday_text || null,
  };
}
