import express from "express";
import mysql from "mysql";


//Initialize Express Server
const app = express();
const ExpressPORT = 3001;
app.listen(ExpressPORT, () => {
  console.log(`Listening on port ${ExpressPORT}`)
})

//Initialize DB Connection
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"rootroot",
  database:"movie_db"
})

//Home View with all movies
app.get("/", (req,res) => {
  const q = "SELECT * FROM movies"
  db.query(q, (err,data)=>{
    if (err){return res.json(err)}
    else return res.json(data)
  })
})

//New Movie Route
app.post("/movies/new/", (req,res)=>{
  res.json("This is where the new movie screen will route.")
  const q = "INSERT INTO movies (movie_name, movie_rating) VALUES (?)"
  const values = [""]
});

//Update Movie Route
app.get("/movies/update/:id", (req, res)=> {
  res.json("This is where the update movie screen will route.")
});
//Delete Movie Route
app.get("/movies/delete/:id", (req, res)=> {
  res.json("This is where the delete movie screen will route.")
});