import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

//Dotenv Config
dotenv.config();

//Initialize Express Server
const app = express();
const ExpressPORT = 3001;
app.listen(ExpressPORT, () => {
  console.log(`Listening on port ${ExpressPORT}`);
});

//Initialize DB Connection
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: "movie",
});

db.connect(function (err) {
  if (err) {
    console.error("error" + ": " + err);
    return;
  }
  console.log("connected as id " + db.threadId);
});

//Setup JSON middleware
app.use(express.json());

//Setup CORS middleware
app.use(cors());

//Home Route with all movies
app.get("/", (req, res) => {
  const q = "Select * from Movie Join Rating on Movie.m_rating_id = Rating.r_id;";
  // const q = "SELECT Movie.m_title, Movie.m_year, Movie.m_run_time, Movie.m_description, Rating.r_rating, Movie.m_director, GROUP_CONCAT(Genre.g_title) FROM Movie JOIN Rating on Movie.m_rating_id = Rating.r_id JOIN Movie_Genre on Movie.m_id = Movie_Genre.m_id JOIN Genre on Movie_Genre.g_id = Genre.g_id GROUP BY Movie.m_id, Movie.m_title;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

//Movie Route by ID
app.get("/movies/:id", (req, res) => {
  const movieID = req.params.id;
  const q = "SELECT Movie.m_title, Movie.m_year, Movie.m_run_time, Movie.m_description, Rating.r_rating, Movie.m_director, GROUP_CONCAT(Genre.g_title) as g_genre FROM Movie JOIN Rating on Movie.m_rating_id = Rating.r_id JOIN Movie_Genre on Movie.m_id = Movie_Genre.m_id JOIN Genre on Movie_Genre.g_id = Genre.g_id WHERE Movie.m_id = ? GROUP BY Movie.m_id, Movie.m_title;"
  db.query(q, [movieID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//New Movie Route
app.post("/movies/new/", (req, res) => {
  const q = `INSERT INTO Movie (m_title, m_year, m_run_time,m_description, m_director, m_rating_id) VALUES (?,?,?,?,?,?);`;
  const q2 = "INSERT INTO Movie_Genre (m_id, g_id) SELECT LAST_INSERT_ID(), g_id FROM Genre WHERE g_id IN (?);"
  const values = [
    req.body.m_title,
    req.body.m_year,
    req.body.m_run_time,
    req.body.m_description,
    req.body.m_director,
    req.body.m_rating_id
  ];
  const genreArray = req.body.m_genre_id.split(",");
  const values2 = [
    genreArray[0],
    genreArray[1],
    genreArray[2],
  ];

  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    db.query(q2, [values2], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
});

//Update Movie Route GET
app.get("/movies/update/:id", (req, res) => {
  const movieID = req.params.id;
  const q = "SELECT Movie.m_title, Movie.m_year, Movie.m_run_time, Movie.m_description, Movie.m_rating_id, Movie.m_director, GROUP_CONCAT(Genre.g_id) as m_genre_id FROM Movie JOIN Rating on Movie.m_rating_id = Rating.r_id JOIN Movie_Genre on Movie.m_id = Movie_Genre.m_id JOIN Genre on Movie_Genre.g_id = Genre.g_id WHERE Movie.m_id = ? GROUP BY Movie.m_id, Movie.m_title;";
  db.query(q, [movieID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Update Movie Route POST
app.put("/movies/update/:id", (req, res) => {
  const m_id = req.params.id;
  const q = "UPDATE Movie SET m_title = ?, m_year = ?, m_run_time = ?, m_description = ?, m_rating_id = ?, m_director = ? WHERE m_id = ?;";
  const q2 = "DELETE FROM Movie_Genre WHERE m_id = ?;";
  const q3 = `INSERT INTO Movie_Genre (m_id, g_id) SELECT ${m_id}, g_id FROM Genre WHERE g_id IN (?);`
  const values = [
    req.body.m_title,
    req.body.m_year,
    req.body.m_run_time,
    req.body.m_description,
    req.body.m_rating_id,
    req.body.m_director,
  ];
  const genreArray = req.body.m_genre_id.split(",");
  const values2 = [
    genreArray[0],
    genreArray[1],
    genreArray[2],
  ];

  db.query(q, [...values, m_id], (err, data) => {
    if (err) return res.json(err);
    db.query(q2, [m_id], (err, data) => {
      if (err) return res.json(err);
      db.query(q3, [values2], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      }
      );
    });
  });
});



//Delete Movie Route
app.delete("/movies/delete/:id", (req, res) => {
  const movieID = req.params.id;
  const q = `DELETE FROM Movie_Genre WHERE m_id = ${movieID};`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    db.query(`DELETE FROM Movie WHERE m_id = ${movieID};`, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
});
