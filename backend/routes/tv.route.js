import express from "express";
// Importing the controller functions for TV routes
import {
	getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvTrailers,
} from "../controllers/tv.controller.js";

// Creating a new router instance for TV routes
const router = express.Router();

// Defining the routes for TV-related endpoints ("id" is a placeholder for TV show ID and "category" is a placeholder for TV category)
router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);

// Exporting the router to be used in other parts of the application
export default router;