const express = require("express");
const morgan = require("morgan"); //  middleware
const moviesRouter = require("./Routes/moviesRoutes");

const app = express();
/**custom middleware*/
const logger = (req, res, next) => {
  console.log("custom middleware called");
  next();
};

app.use(express.json()); // using middleware for the body data and the middleware is express.json()
app.use(morgan("dev")); // calling morgan which returns a function which works as a middleware
app.use(express.static("./public"));
app.use(logger); // we are just paasing the middleware not calling.
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// ROUTE HANDLER FUNCTIONS

// /** GET - api/v1/movies*/
// app.get("/api/v1/movies/", getAllMovies)
// /**GET - api/v1/movies/id */
// app.get("/api/v1/movies/:id",getMovie)
// /**POST - api/v1/movies */
// app.post("/api/v1/movies", createMovie);
// /**PATCH - api/v1/movies/id */
// app.patch("/api/v1/movies/:id", updateMovie);
// /**DELETE - api/v1/movies/id */
// app.delete("/api/v1/movies/:id", deleteMovie)

app.use("/api/v1/movies/", moviesRouter);

module.exports = app;
