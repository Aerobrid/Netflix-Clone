// This module handles the connection to the MongoDB database 
import mongoose from "mongoose";
// for importing environment variables
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    // mongoose.connect returns a promise, so we use await to wait for the connection to be established
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error.message);
    process.exit(1); // Exit the process with failure (1 = error, 0 = success)
  }
}
