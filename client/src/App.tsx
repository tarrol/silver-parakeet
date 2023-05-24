// import axios from "axios";
// import React, { useEffect, useState } from "react";

function App() {
  return (
    <div className="App"></div>
  );
}


function fetchMovies() {
  // console.log("Hello World")
  fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(data => sortData(data));
}
document.getElementById('buttony-button')?.addEventListener("click", fetchMovies)

function sortData(data){
  const movies = data.map(movie => {
    return {
      id: movie.idmovies,
      name: movie.movie_name,
      rating: movie.movie_rating
    }
  })
  console.log(movies[0])
}


export default App;
