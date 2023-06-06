import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  const [movies, setMovies] = useState<any[]>([]);

  //Fetch the movies retrieved by the server
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3001/");
        setMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className="Home">
      <h1>Welcome.</h1>
      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie.m_id}>
            <h2>{movie.m_title}</h2>
            <a>Rated {movie.r_rating}</a>
            <h3>Synopsis: </h3>
            <p>{movie.m_description}</p>
            <p>Directed by: {movie.m_director}</p>
            <p>Run time: {movie.m_run_time} minutes.</p>
            <p>Originally released: {movie.m_year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
