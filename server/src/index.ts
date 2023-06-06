import express from "express";
import mysql from "mysql2";
import cors from "cors";

//Initialize Express Server
const app = express();
const ExpressPORT = 3001;
app.listen(ExpressPORT, () => {
  console.log(`Listening on port ${ExpressPORT}`)
})

//Initialize DB Connection
const db = mysql.createConnection({
 
})

db.connect(function(err){
  if (err){
    console.error('error'+ ": " + err)
    return;
  }
  console.log('connected as id '+ db.threadId)
})

//Setup JSON middleware
app.use(express.json())

//Setup CORS middleware
app.use(cors())

//Home Route with all movies
app.get("/", (req,res) => {
  const q = "SELECT * FROM Movie JOIN Rating on  Rating.r_id = Movie.m_rating_id;"
  db.query(q, (err,data)=>{
    if (err) return res.json(err)
    else return res.json(data);
  })
})

//New Movie Route
app.post("/movies/new/", (req,res)=>{
  res.json("This is where the new movie screen will route.");
  const q = "INSERT INTO movies (movie_name, movie_rating) VALUES (?)";
  const values = [
    req.body.title,
    req.body.rating
  ];
  db.query(q,[values], (err, data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
});

//Update Movie Route
app.get("/movies/update/:id", (req, res)=> {
  res.json("This is where the update movie screen will route.")
});
//Delete Movie Route
app.get("/movies/delete/:id", (req, res)=> {
  res.json("This is where the delete movie screen will route.")
});