// This is entry-point of application
// by changing type to "module" in package.json, we use import/export syntax instead of require/module.exports syntax from "CommonJS" 
// express is a web framework for Node.js to build web applications and APIs easily
import express from 'express'; 
// Keep MongoDB awake
import mongoose from "mongoose";
// cookie-parser is a package to parse cookies attached to the client request object
import cookieParser from 'cookie-parser'; 
import path from "path";

// contains all the routes related to authentication
import authRoutes from './routes/auth.route.js'; 
// contains all the routes related to movies
import movieRoutes from './routes/movie.route.js';
// contains all the routes related to TV shows
import tvRoutes from './routes/tv.route.js';
// contains all the routes related to search functionality
import searchRoutes from './routes/search.route.js';

// config contains environment variables and database connection logic
import { ENV_VARS } from './config/envVars.js';
// connectDB is a function that connects to the database
import { connectDB } from './config/db.js';
// protectRoute is a middleware that checks if the user is authenticated before allowing access to certain routes
import { protectRoute } from "./middleware/protectRoute.js";

// an instance of express application named "app"
const app = express();

// is the port # where the server will listen for incoming requests
const PORT = ENV_VARS.PORT
const __dirname = path.resolve();

// middleware that allows access to req.body in the route handlers (in file routes/auth.route.js) as JSON and parses it
app.use(express.json()); 
// allows you to access cookies in the request object (req.cookies) in the route handlers
app.use(cookieParser());

// any routes from auth.route.js will be prefixed with /api/v1/auth (accessible under http://localhost:PORT/api/v1/auth)
app.use("/api/v1/auth", authRoutes)
// any routes from movie.route.js will be prefixed with /api/v1/movie (accessible under http://localhost:PORT/api/v1/movie)
// protectRoute checks if the user is authenticated before allowing access to movie routes
app.use("/api/v1/movie", protectRoute, movieRoutes)
// any routes from tv.route.js will be prefixed with /api/v1/tv (accessible under http://localhost:PORT/api/v1/tv)
// protectRoute checks if the user is authenticated before allowing access to tv routes
app.use("/api/v1/tv", protectRoute, tvRoutes);
// any routes from search.route.js will be prefixed with /api/v1/search (accessible under http://localhost:PORT/api/v1/search)
// protectRoute checks if the user is authenticated before allowing access to search routes
app.use("/api/v1/search", protectRoute, searchRoutes);

// optional endpoint to ping MongoDB cluster
app.get("/ping-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("MongoDB is awake 🚀");
  } catch (err) {
    console.error("Ping failed:", err);
    res.status(500).send("Error pinging DB");
  }
});

// HEAD request for uptime monitors
app.head("/", (req, res) => {
  res.sendStatus(200);
});

if(ENV_VARS.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// start the server and listen on the specified port
// connect to database
app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
  connectDB();
});
