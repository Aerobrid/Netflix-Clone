// used to make http requests to the TMDB API using get and post methods
import axios from "axios";
// includes the tmdb API key from the environment variables
import { ENV_VARS } from "../config/envVars.js";

// takes in a URL and fetches data from the TMDB API
// is used in the movie.controller.js file to get movie details, trailers, similar movies, and categories
export const fetchFromTMDB = async (url) => {
	// required to make the request to the TMDB API 
	// the API key is passed in the headers for authentication
	// the URL is the endpoint of the TMDB API that we want to fetch data from
	const options = {
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
		},
	};

	// waits for the axios GET request to complete
	// axios is used to make the GET request to the TMDB API with the provided URL and options
	const response = await axios.get(url, options);

	// Check if the response status is not successful (200 OK)
	if (response.status !== 200) {
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	// contains the actual data from the TMDB API
	return response.data;
};