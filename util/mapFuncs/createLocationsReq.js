export default async function createLocations(locationData) {
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