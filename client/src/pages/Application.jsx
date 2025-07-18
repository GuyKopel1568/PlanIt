import { useState } from 'react';
import TripDetailsForm from '../components/TripDetailsForm.jsx';

function Application() {
  const [isTripFormVisible, setIsTripFormVisible] = useState(false);
  return (
    <div>
      {!isTripFormVisible && (
        <button onClick={() => setIsTripFormVisible(true)}>
          Open trip form
        </button>
      )}
      {isTripFormVisible && <TripDetailsForm />}
    </div>
  );
}

export default Application;
