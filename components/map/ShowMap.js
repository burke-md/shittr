import React from "react";
import { useCallback } from "react";
import { QueryClientProvider, QueryClient, useQuery, useMutation } from "react-query";
import { GoogleMap, useLoadScript, Marker, Data } from "@react-google-maps/api";
import mapStyleOverride from "../../data/mapStyleOverride";
import fetchLocationsReq from "../../util/mapRequests/fetchLocationsReq";
import createLocationReq from "../../util/mapRequests/createLocationsReq";


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
  lat: 43.6532,
  lng: -79.3832,
};

const queryClient = new QueryClient()
/*
async function createLocationReq(locationData) {
  console.log(`called create`)
  const res = await fetch("/api/locations/qq", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ create: {
        ...locationData
      }
    })
  })
  const data = await res.json();
  console.log(`data: ${JSON.stringify(data)}`)

  return data.crudOpsReturn[0];
}
*/

export default function ShowMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const {data: locationsData, status} = useQuery("locationsData", fetchLocationsReq);

  const mutation = useMutation(createLocationReq, {
    /*Optimistic update
    -> Stop queries, preserve existing data, force update data with temp key
    -> If error, roll back to prev state
    -> Refetch & confirm. Update key w/ real key from db
    */
    
    onMutate: (newData) => {
      queryClient.cancelQueries("locationsData");
      const existing = queryClient.getQueryData("locationsData");
      console.log(`existing: ${existing}`)
      /*
      queryClient.setQueryData("locationsData", (prev) => [
        ...prev,
        {...newData, id: new Date().toISOString() },
      ]);
      */
      //return prev cache state for rollback
      return existing;
    },
    onError: (error, newData, rollback) => rollback(),
    onSettled: () => queryClient.refetchQueries("locations"),
  });

  const onMapClick = useCallback((e) => {
    mutation.mutate({
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




