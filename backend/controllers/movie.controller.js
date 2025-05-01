// needed to fetch movie data from TMDB API
import { fetchFromTMDB } from "../services/tmdb.service.js";

// sends a random trending movie from TMDB API
// this function is called when a request is made to the /trending endpoint
// (req = request or client-to-server, res = response or server-to-client)
export async function getTrendingMovie(req, res) {
	try {
    // Fetches trending movies list from TMDB API
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    // If the get request is successful, server returns a random movie from the trending movies list
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    // output the random movie as a JSON response to the client
		res.json({ success: true, content: randomMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// This function retrieves movie trailers for a specific movie ID
// It is called when a request is made to the /:id/trailers endpoint
export async function getMovieTrailers(req, res) {
  // extracts the movie ID from the URL
  // req.params contains the parameters from the URL, in this case, the movie ID
	const { id } = req.params;
	try {
    // Fetches movie trailers from TMDB API using the movie ID
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    // If the request is successful, server returns the trailers in the response as JSON to client
		res.json({ success: true, trailers: data.results });
	} catch (error) {
    // If an error occurs, it checks if the error is a 404 (not found) error
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

    // If the error is not a 404, it returns a 500 status code
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// This function retrieves details of a specific movie by its ID
// It is called when a request is made to the /:id/details endpoint
export async function getMovieDetails(req, res) {
  // extracts the movie ID from the URL (from req.params)
  // there is other info that can be extracted from the URL, such as query parameters (req.query), but we are only interested in the movie ID 
	const { id } = req.params;
	try {
    // Fetches movie details from TMDB API using the movie ID
    // The URL includes the movie ID and specifies the language as English (en-US)
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
      // sending null if the movie is not found (404 error)
      // this is useful for the client to know that the movie does not exist or was not found
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// This function retrieves similar movies based on a specific movie ID
// It is called when a request is made to the /:id/similar endpoint
export async function getSimilarMovies(req, res) {
  // extracts the movie ID from the URL
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// This function retrieves movies by category (e.g., popular, top-rated, etc.)
// It is called when a request is made to the /:category endpoint 
export async function getMoviesByCategory(req, res) {
  // extracts the movie category from the URL
	const { category } = req.params;
	try {
    // we use backticks but we could also use string concatenation
    // the category is passed in the URL to fetch movies of that category
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}