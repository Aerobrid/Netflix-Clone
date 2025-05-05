// need user model and fetchFromTMDB service
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// Controller function for searching people using The Movie Database (TMDB) API
export async function searchPerson(req, res) {
  // Extract the search query from the request parameters
  // req.params.query is the part of the URL that contains the search term
  const { query } = req.params; 
  try {
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    
    // to be fleshed out in frontend
    // if no results are found, return a 404 status code with null response
    if(response.results.length === 0) {
      return res.status(404).send(null);
    }
    
    // Update the user's search history by pushing the first result into the searchHistory array
    // req.user._id is the ID of the authenticated user
    // we will be using these values in the frontend to display search history
    // $push operator adds a new item to the end of the searchHistory array
    // Each search history item contains the ID, image, title, search type, and creation date
    await User.findByIdAndUpdate(req.user._id, {
      $push:{
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createAt: new Date(),
        },
      },
    });

    // Send a JSON response with the search results
    // response.results contains an array of search results from the TMDB API
    res.status(200).json({success: true, content: response.results});
  } catch (error) {
    // Log the error message to the console for debugging
    // and send a 500 status code with an error message to the client
    console.log("Error in searchPerson controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller function to search for movies using The Movie Database (TMDB) API
export async function searchMovie(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// if id is same as the one in search history, do not push to search history
		if(req.user.searchHistory.some((item) => item.id === response.results[0].id)) {
			return res.status(200).json({ success: true, content: response.results });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller function to search for TV shows using The Movie Database (TMDB) API
export async function searchTv(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller function to get the search history of the authenticated user
export async function getSearchHistory(req, res) {
	try {
    // fetch search history from the user object attached to the request by the protectRoute middleware
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller function to remove an item from the user's search history by its ID
export async function removeItemFromSearchHistory(req, res) {
  // Extract the ID from the request parameters
	let { id } = req.params;

  // Convert the ID to an integer
  // This is necessary because the ID in the database is stored as an integer
  // if left as a string it would not delete item from search history in database
	id = parseInt(id);

	try {
    // Find the user by their ID and remove the item with the specified ID from their search history
		await User.findByIdAndUpdate(req.user._id, {
      // $pull operator removes items from an array that match the specified condition (in this case, the ID)
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}