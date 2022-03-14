import React, { useCallback } from "react";
import { QueryClient, useQuery, useMutation } from "react-query";
import { GoogleMap, useLoadScript, Marker, Data } from "@react-google-maps/api";
import mapStyleOverride from "../../data/mapStyleOverride";
import { createLocations, fetchLocations } from "../../util/requests/locations";
//import mutation from "../../util/mapFuncs/mutation";


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

export default function ShowMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { data: locationsData, status } = useQuery("locationsData", fetchLocations);

  const mutation = useMutation(createLocations, {
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
        {locationsData && locationsData?.map((location) => (
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



