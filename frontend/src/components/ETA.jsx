import React, { useEffect, useState } from 'react';

const ETAUpdate = ({ origin, destination }) => {
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchETA = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/calculate-eta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ origin, destination }),
        });
        const data = await response.json();
        setEta(data.eta);
      } catch (error) {
        console.error('Error fetching ETA:', error);
      }
    };

    fetchETA();
  }, [origin, destination]);

  return (
    <div className="eta-update">
      {eta ? <p>Estimated Time of Arrival: {eta} minutes</p> : <p>Calculating ETA...</p>}
    </div>
  );
};

export default ETAUpdate;
