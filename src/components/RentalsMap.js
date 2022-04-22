import React from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import { useState, useEffect } from 'react';

function RentalsMap({ locations, google, setHighLight }) {

  const [center, setCenter] = useState();

  useEffect(() => {
    var arr = Object.keys(locations);
    var getLat = (key) => locations[key]["lat"];
    var avgLat = arr.reduce((a, c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => locations[key]["lng"];
    var avgLng = arr.reduce((a, c) => a + Number(getLng(c)), 0) / arr.length;

    if (avgLat && avgLng) {
      setCenter({ lat: avgLat, lng: avgLng });
    } else {
      setCenter({ lat: 0, lng: 0 });
    }
  }, [locations]);

return (
  <div>
    {center &&
      (
        <Map
          google={google}
          containerStyle={{
            width: "50vw",
            height: "calc(100vh - 135px)",
          }}
          center={center}
          initialCenter={locations[0]}
          zoom={13}
          disableDefaultUI={true}
        >
          {locations.map((coords, i) => (
            <Marker key={i} position={coords} onClick={() => setHighLight(i)} />
          ))}
        </Map>
      )}
  </div>
);
}

export default GoogleApiWrapper({ apiKey: "" })(RentalsMap);
