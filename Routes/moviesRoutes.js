const express = require("express");
const moviesController = require("./../Controllers/moviesController");

const router = express.Router();

// router.param("id",(req,res,next,value)=>{
//   console.log(`the id is ${value}`);
//   next();
// });
 
router.param("id",moviesController.checkedID);

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.validateBody,moviesController.createMovie); // chaining multiple middleware

router
  .route("/:id")
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;
