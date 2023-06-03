// import axios from "axios";
// import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="center colorWhite">Welcome to my Website</h1>
        <div id="movie-cards-container" className="movie-cards-container"></div>
      </header>
    </div>
  );
}


function initMovies() {
  fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(data => renderMovies(data));
}

function renderMovies(data:any){
  const movies = data.map((movie:any) => {
    return {
      id: movie.idmovies,
      name: movie.movie_name,
      rating: movie.movie_rating
    }
  })
  const movieCardsContainer = document.getElementById("movie-cards-container");

  movies.forEach((movie:any) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const movieImage = document.createElement("div");
    movieImage.className = `movie-card-image`;
    // Replace the background color with an <img> tag and set the image source
    // movieImage.style.backgroundImage = `url(${movie.image})`;

    const movieName = document.createElement("h2");
    movieName.className = "movie-name";
    movieName.textContent = movie.name;

    const movieRating = document.createElement("p");
    movieRating.className = "movie-rating";
    movieRating.textContent = `Rating: ${movie.rating}`;

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieName);
    movieCard.appendChild(movieRating);

    movieCardsContainer?.appendChild(movieCard);
  });
}

initMovies();

export default App;
