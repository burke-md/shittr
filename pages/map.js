import React from "react";
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyleOverride from "../util/mapStyleOverride";

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  styles: mapStyleOverride,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 50,
  lng: -50,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading map...";

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onLoad={onMapLoad}
      onClick={(e) => {
        setMarkers((curr) => [
          ...curr, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
        ])
      }}
    >
    {markers.map((marker) => (
      <Marker 
      key={marker.lat * marker.lng}
      position={{lat: marker.lat, lng: marker.lng}}
      />
    ))}  
    </GoogleMap>
  );
}