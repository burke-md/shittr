import React, { useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { GoogleMap, useLoadScript, Marker, Data } from "@react-google-maps/api";
import mapStyleOverride from "../../data/mapStyleOverride";
import { createLocations, fetchLocations } from "../../util/requests/locations";

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


export default function ShowMap() {
  const queryClient = useQueryClient();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { data: locationsData, status } = useQuery("locationsData", fetchLocations);

  const mutation = useMutation(createLocations, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries("locationsData");
      const existing = await queryClient.getQueryData("locationsData");
      queryClient.setQueryData("locationsData", 
        (prev) => {
          return {
            data: [
              ...prev.data,
              {...newData, id: new Date().toISOString() },
            ]
          }
        }
      );
      
      //return prev cache state for rollback
      return existing;
    },
    onError: (error, newData, rollback) => rollback(),
    onSettled: () => queryClient.refetchQueries("locationsData"),
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
        {
          locationsData && locationsData.data.map(
            (location) => (
              <Marker 
                key={location.id}
                position={{
                  lat: Number(location.latitude), 
                  lng: Number(location.longitude)
                }}
              />
            )
          )
        }  
      </GoogleMap>
    )}
    </>
  );
}




