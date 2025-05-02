import express from "express";
// Importing the search controller functions
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchMovie,
	searchPerson,
	searchTv,
} from "../controllers/search.controller.js";

// Creating a new router instance from express
// This router will handle all the search-related routes
const router = express.Router();

// Defining the routes for searching movies, persons, and TV shows
// Each route will call the corresponding controller function when accessed
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

// Route to get the search history of the authenticated user
router.get("/history", getSearchHistory);

// Route to remove an item from the search history by its ID
router.delete("/history/:id", removeItemFromSearchHistory);

// Exporting the router so it can be used in other parts of the application
export default router;