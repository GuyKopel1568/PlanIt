import { useState } from 'react';
import Map from '../components/map/Map';
import AttractionData from '../components/application/AttractionData';

function Application() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="flex gap-6 p-6 relative">
      <Map onPlaceSelect={setSelectedPlace} />
      <div className="w-[50%] pt-2">
        <AttractionData place={selectedPlace} />
      </div>
    </div>
  );
}

export default Application;
