// This file defines the User model for MongoDB using Mongoose (mongoose is an ODM - Object Data Modeling library for MongoDB and Node.js)
import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  searchHistory: {
    type: Array,
    default: []
  }
});

// Create a Mongoose model from the schema
// The model is a class that constructs documents from the schema and provides methods to interact with the database
export const User = mongoose.model('User', userSchema);