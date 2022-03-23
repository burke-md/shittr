import axios from "../../axios";

export async function createLocations(locationData) {
	return await axios.post("/api/locations", locationData)
}

export async function fetchLocations() {
	return await axios.get("/api/locations")
}