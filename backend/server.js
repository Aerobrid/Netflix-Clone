// This is entry-point of application
// by changing type to "module" in package.json, we use import/export syntax instead of require/module.exports syntax from "CommonJS" 
// express is a web framework for Node.js to build web applications and APIs easily
import express from 'express'; 

// contains all the routes related to authentication
import authRoutes from './routes/auth.route.js'; 
// config contains environment variables and database connection logic
import { ENV_VARS } from './config/envVars.js';
// connectDB is a function that connects to the database
import { connectDB } from './config/db.js';

// an instance of express application named "app"
const app = express();

// is the port # where the server will listen for incoming requests
const PORT = ENV_VARS.PORT

// middleware that allows access to req.body in the route handlers (in file routes/auth.route.js) as JSON and parses it
app.use(express.json()); 

// any routes from auth.route.js will be prefixed with /api/v1/auth (accessible under http://localhost:PORT/api/v1/auth)
app.use("/api/v1/auth", authRoutes)

// start the server and listen on the specified port
// connect to database
app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
  connectDB();
});
