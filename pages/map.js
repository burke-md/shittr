import React from "react";
import { useState, useCallback } from "react";
import { QueryClientProvider, QueryClient, useQuery, useMutation, queryCatch } from "react-query";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import mapStyleOverride from "../util/mapStyleOverride";
import { useSession, signIn, signOut } from "next-auth/react"


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

async function fetchLocationsReq(){
  const res = await fetch("/api/locations/read");
  const data = await res.json();
  const { locations } = data;
  return locations;
}

async function createLocationReq(locationData) {
  const res = await fetch("/api/locations/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ location: locationData})
  })
  const data = await res.json();
  const { location } = data;
  console.log(`New location created: ${JSON.stringify(location)}`);
  return location;
}

const queryClient = new QueryClient()

export default function App() {
  const { data: session } = useSession()
  return (
    <QueryClientProvider client={queryClient}>
      {session && <ShowMap />}
      {!session && 
      <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      </>}
    </QueryClientProvider>
  )
}


function ShowMap(){
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const {data: locationsData, status} = useQuery("locationsData", fetchLocationsReq);

  const onMapClick = useCallback((e) => {
    createLocationReq({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    })
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading map...";

  console.log(`LocationsData: ${JSON.stringify(locationsData)}`)

  return (
    <>
    {status === "loading" && <p>Loading..</p>}

    {status === "success"  &&(
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        >
      {locationsData?.map((location) => (
        <Marker 
        key={location.id}
        position={{
          lat: Number(location.latitude), 
          lng: Number(location.longitude)
        }}
        />
      ))}  
      </GoogleMap>
    )}
    </>
  );
}