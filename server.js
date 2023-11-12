const mongoose = require("mongoose");
const app = require("./app");
// console.log(process.env.CONN_STR);
mongoose
  .connect(
    "mongodb+srv://admin:pEs9L3xRR7xegHie@cluster0.rvnjs6f.mongodb.net/cineflix?retryWrites=true&w=majority",
    {
      useNewUrlPArser: true,
    }
  )
  .then((conn) => {
    // console.log(conn);
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// /**creating a document */
// const testMovie = new Movie({
//   name: "Om Shanti Om",
//   description:
//     "Om Shanti Om is a hit Hindi action movie directed by Farah Khan and starring Shahrukh Khan and Deepika Padukone. It was released in 2007 and had a budget of INR 80 million",
//   duration: 162,
//   ratings: 6.7,
// });

// testMovie
//   .save() // save() method returns a promise
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log("error occured : " + err));

/**CREATE A SERVER to listen the request */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log("port is:",port)
  console.log("server has started");
});
