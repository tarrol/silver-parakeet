import express from 'express';
// import mysql from 'mysql'
import { ArrayDataType, QueryTypes, Sequelize } from 'sequelize';
// import { viewMovies } from './dbfunctions';
const cors = require('cors')

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const sqlCon = new Sequelize('movie_db', 'root', 'rootroot', { host: 'localhost', dialect: 'mysql', port: 3306, });

app.listen(3001, () => console.log('Now listening on port 3001'));

// const getMoivse = new Promise((res, err)=> {
//   res(sqlCon.query('SELECT movie_name FROM movies WHERE idmovies = 1;', { type: QueryTypes.SELECT })).then(return res)
// })

// var userSearch:string = "Dungeons & Dragons";

// async function getMovies(userSearch: string) {
//   return sqlCon.query(`SELECT * FROM movies WHERE movie_name LIKE '%${userSearch}%';`, { type: QueryTypes.SELECT });
//   // return queryMovies;
// }

var moviesList: any = [];
var userSearch = "Dungeons & Dragons"

async function createMoviesList() {
  await sqlCon.query(`SELECT * FROM movies;`, { type: QueryTypes.SELECT })
  // await sqlCon.query(`SELECT * FROM movies WHERE movie_name LIKE '%${movieName}%';`, { type: QueryTypes.SELECT })
    .then((res) => { moviesList = res; return moviesList; })
    // .then(() => {
    //   // console.log('Movies list updated: ')
    //   // console.log('Movie | Rating')
    //   for (let i = 0; i < moviesList.length; i++) {
    //     console.log(moviesList[i].movie_name + ", " + moviesList[i].movie_rating + "/5")
    //   }
    // }
    // )
}

  app.get("/", function (req, res) {
    console.log("Request received")
    createMoviesList().then(() => { console.log(moviesList); res.json(moviesList) ;})
    // res.json(moviesList)
  })


// async function resolveMovie(userSearch:string){
//   var searchResult = await getMovies(userSearch)
//   return searchResult
// }



// const movie:any = JSON.parse(getMovies().then((result)=>{return result;}))
// var searchResult:Object;

// var movieObject = searchResult[];
// var renderedInformation = {
  // id: movieObject.idmovies,
  // movieName: movieObject.movie_name,
  // movieRating: movieObject.movie_rating
// }
// console.log(searchResult)