import React from 'react';

function AttractionData({ place }) {
  if (!place)
    return <p className="text-gray-500">Search for a place to see details.</p>;

  const photoUrl = place.photos?.[0]?.getUrl();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xl">
      <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
      <p className="text-gray-600">{place.formatted_address}</p>
      {photoUrl && (
        <img
          src={photoUrl}
          alt={place.name}
          className="mt-3 rounded max-h-64 object-cover"
        />
      )}
      <p className="mt-2">⭐ Rating: {place.rating}</p>
      <p>📞 Phone: {place.formatted_phone_number}</p>
      {place.website && (
        <p className="mt-1">
          🌐 Website:{' '}
          <a
            href={place.website}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            {place.website}
          </a>
        </p>
      )}
    </div>
  );
}

export default AttractionData;
