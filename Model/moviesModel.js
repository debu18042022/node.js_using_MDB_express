const mongoose = require("mongoose");

/**Creating a Scheme */
const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required!"],
    unique: true,
    trim: true, // if there is any white space before the movie name and after the movie name it will remove those white spaces
  },
  description: {
    type: String,
    required: [true, "description field is required!"],
    trim: true, // if there is any white space before the movie name and after the movie name it will remove those white spaces
  },
  duration: {
    type: Number,
    required: [true, "duration field is required!"],
  },
  ratings: {
    type: Number,
  },
  totalRaating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: [true, "genres field is required!"],
  },
  directors: {
    type: [String],
    required: [true, "director field is required!"],
  },
  coverImg: { type: [String], required: [true, "coverImg field is required!"] },
  actors: {
    type: [String],
    required: [true, "actors field is required!"],
  },
  price: {
    type: Number,
    required: [true, "price field is required"],
  },
});

/**creating a model */
const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;
