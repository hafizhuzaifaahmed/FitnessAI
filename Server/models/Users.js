const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Make userName unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Make email unique
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Create a model from the schema and specify the collection name
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
