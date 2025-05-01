import express from "express";
// Importing movie controller functions
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";

// establishing a new router instance from express
const router = express.Router();

// Defining routes for movie-related endpoints ("id" is a placeholder for movie ID and "category" is a placeholder for movie category)
router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

// Exporting the router to be used in other parts of the application
export default router;