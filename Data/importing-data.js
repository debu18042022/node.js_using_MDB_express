const mongoose = require("mongoose");
const fs = require("fs");
const Movie = require("./../Model/moviesModel");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const movies = JSON.parse(fs.readFileSync("./Data/movies.json"), { encoding: 'utf8' });

// database connectivity
mongoose.connect(process.env.CONN_STR, { useNewUrlPArser: true })
    .then((conn) => {
        console.log("db has connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

/**Delete Existing Movie documents from collection */
const deleteExistingDatabaseData = async () => {
    try {
        await Movie.deleteMany();
        console.log("documents deleted successfully");
    } catch (error) {
        console.log(err);
    }
    process.exit();
}

/**import documents to Database collection */
const importDataToDatabase = async () => {
    try {
        await Movie.create(movies);
        console.log("movies imported successfully");
    } catch (error) {
        console.log(err);
    }
    process.exit();
}

// console.log("process.argv", process.argv);
if (process.argv[2] === '--delete') {
    deleteExistingDatabaseData()
}
if (process.argv[2] === '--import') {
    importDataToDatabase();
}

