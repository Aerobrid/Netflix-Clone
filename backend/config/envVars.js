// dotenv is a package that loads environment variables from a .env file into process.env for use in the application
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Export an object containing the environment variables used in the application
export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};