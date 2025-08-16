import { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const BLUE_PIN_URL =
  'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png';

export default function AttractionMarkers({ pins = [] }) {
  const [activePin, setActivePin] = useState(null);

  return (
    <>
      {pins.map((p, i) => (
        <Marker
          key={`${p.city}-${p.name}-${i}`}
          position={{ lat: p.lat, lng: p.lng }}
          icon={{ url: BLUE_PIN_URL }}
          label={{
            text: String(p.order),
            color: 'white',
            fontSize: '12px',
            fontWeight: '700',
          }}
          title={`${p.city}: ${p.name}${p.rating ? ` (⭐ ${p.rating})` : ''}`}
          onClick={() => setActivePin(p)}
        />
      ))}

      {activePin && (
        <InfoWindow
          position={{ lat: activePin.lat, lng: activePin.lng }}
          onCloseClick={() => setActivePin(null)}
        >
          <div style={{ direction: 'rtl', maxWidth: 220 }}>
            <div style={{ fontWeight: 700 }}>{activePin.name}</div>
            {activePin.rating ? <div>⭐ {activePin.rating}</div> : null}
            <div style={{ fontSize: 12, opacity: 0.7 }}>{activePin.city}</div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
