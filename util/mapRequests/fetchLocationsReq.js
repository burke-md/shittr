export default async function fetchLocations() {
    const res = await fetch("/api/locations/qq", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({read: {"locations": ""}})
    });
    const data = await res.json();
    const parsedData = data.crudOpsReturn[0];
    console.log(`parsedData: ${parsedData}`);
    return parsedData;

}