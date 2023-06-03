import express from 'express';
import { ArrayDataType, INTEGER, QueryTypes, Sequelize } from 'sequelize';
const cors = require('cors')

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const sqlCon = new Sequelize('movie_db', 'root', 'rootroot', { host: 'localhost', dialect: 'mysql', port: 3306 });

app.listen(3001, () => console.log('Now listening on port 3001'));

var moviesList: any = [];
// var userSearch = "Dungeons & Dragons"

async function createMoviesList() {
  await sqlCon.query(`SELECT * FROM movies;`, { type: QueryTypes.SELECT })
    // await sqlCon.query(`SELECT * FROM movies WHERE movie_name LIKE '%${movieName}%';`, { type: QueryTypes.SELECT })
    .then((res) => {
      moviesList = res;
      return moviesList;
    })
}

async function deleteMovie(movieID:number){

  try{
  const result = await sqlCon.query(`DELETE FROM movies where idmovies = ${movieID}`);
  console.log(`Movike with ID ${movieID} successfully deleted.`);
  } catch (error){
    console.error("Error deleteing movie:", error);
  }
}


// Get all movies
app.get("/", function (req, res) {
  console.log("Request received")
  createMoviesList().then(() => { console.log(moviesList); res.json(moviesList); })
})

// Delete a movie
app.delete("/movies/delete/:id", function (req, res) {
  const movieID: number = parseInt(req.params.id);
  if (!isNaN(movieID)) {
    deleteMovie(movieID)
      .then(() => {
        // Movie deleted successfully, redirect to the home page
        res.redirect("/");
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        res.status(500).send("Failed to delete movie");
      });
  } else {
    res.status(400).send("Invalid Movie ID");
  }
});

// Create a new movie
app.post("/movies/new", function (req, res) {
  // Logic to create a new movie
  res.send("Movie created successfully");
});

// Get a specific movie by ID
app.get("/movies/:id", function (req, res) {
  const movieId = req.params.id;
  // Logic to fetch a movie by ID
  res.send(`Movie with ID ${movieId}`);
});

// Update a movie by ID
app.put("/movies/update/:id", function (req, res) {
  const movieId = req.params.id;
  // Logic to update a movie by ID
  res.send(`Movie with ID ${movieId} updated successfully`);
});