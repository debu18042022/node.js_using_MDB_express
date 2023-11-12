const Movie = require("./../Model/moviesModel");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // find method returns a promise
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    // const movie = Movie.find({ _id: req.params.id }); // find method returns a promise
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        movie: movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  // const testMovie = new Movie({});
  // testMovie.save();    // save method returns a promise
  try {
    const movie = await Movie.create(req.body); // create method returns a promise
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: { movie: updatedMovie },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
