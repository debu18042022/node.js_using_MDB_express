const fs = require("fs");

const movies = JSON.parse(fs.readFileSync("./Data/movies.json"));

exports.checkedID = (req, res, next, value) => {
  const movie = movies.find((item) => item.id === value * 1); // FIND MOVIE BASED ON ID PARAMETER
  if (!movie) {
    // if no movie id match with the user requested id
    return res.status(404).json({
      status: "fail",
      message: `no movie object with ID  ${value} is found`,
    });
  }
  next();
};

exports.validateBody = (req,res,next) =>{
  if(!req.body.name || !req.body.releaseYear){
    return res.status(400).json({
      status:"fail",
      message:"invalid movie data"
    })
  }
  // console.log("req.body",req.body)
  next();
}

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
  const id = req.params.id * 1; // CONVERT ID TO NUMBER TYPE
  const movie = movies.find((item) => item.id === id); // FIND MOVIE BASED ON ID PARAMETER
  // if (!movie) {
  //   // if no movie id match with the user requested id
  //   return res.status(404).json({
  //     status: "fail",
  //     messgae: "data not found",
  //   });
  // }
  res.status(200).json({
    // SEND MOVIE IN THE RESPONSE
    status: "success",
    data: {
      movie: movie,
    },
  });
};

exports.createMovie = (req, res) => {
  console.log("req.body",req.body);
  const newId = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: { movie: newMovie },
    });
  });
};

exports.updateMovie = (req, res) => {
  const id = req.params.id * 1; //multiplying by 1 because we need to convert req.params.id value which is string into number
  const movieToUpdate = movies.find((item) => item.id === id);
  const index = movies.indexOf(movieToUpdate);
  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `no movie object with ID  ${id} is found`,
  //   });
  // }
  Object.assign(movieToUpdate, req.body); //merge data of movieToUpdate and req.body into the movieToUpdate
  movies[index] = movieToUpdate;
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

exports.deleteMovie = (req, res) => {
  const id = req.params.id * 1;
  const movieToDelete = movies.find((item) => item.id === id);
  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     success: "fail",
  //     message: `no movie object with ID  ${id} is found to delete`,
  //   });
  // }
  const index = movies.indexOf(movieToDelete);
  movies.splice(index, 1);
  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null,
      },
    });
  });
};
