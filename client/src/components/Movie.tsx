import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Movie() {
  const [movie, setMovie] = useState({
    m_title: "",
    m_year: "",
    m_run_time: "",
    m_description: "",
    m_director: "",
    r_rating: "",
    g_genre:""
  })
console.log(movie)
  let location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3001` + location.pathname);
        setMovie(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="form">
      <div>
        <h1>{movie.m_title} Overview</h1>
        <h2>Initial Release: </h2> <p>{movie.m_year}</p>
        <h2>Run time:</h2> <p>{movie.m_run_time} minutes</p>
        <h2>Description: </h2> <p>{movie.m_description}</p>
        <h2>Director: </h2> <p>{movie.m_director}</p>
        <h2>Rating: </h2> <p>{movie.r_rating}</p>
        <h2>Genre: </h2> <p>{movie.g_genre}</p>
        <button><Link to="/">Back</Link></button>
      </div>
    </div>
  )
}

export default Movie