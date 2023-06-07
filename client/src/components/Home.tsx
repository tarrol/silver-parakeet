import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  //Delete a movie
  const handleDelete = async (movie: any) => {
    if (window.confirm(`Are you sure you want to delete ${movie.m_title}?`)){
    try {
      await axios.delete(`http://localhost:3001/movies/delete/${movie.m_id}`);
      window.location.reload();
    }
    catch (error) {
      console.error(error)
    }
    }
    return;
  }



  return (
    <div className="Home">
      <h1>Welcome. You have {movies.length} movies in your collection.</h1>
      <div>
        <button><Link to="/movies/new">Add a movie</Link></button>
      </div>
      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie.m_id}>
            <h2><Link to={`/movies/${movie.m_id}`}>{movie.m_title}</Link></h2>
            <a>Rated {movie.r_rating}</a>
            <h3>Synopsis: </h3>
            <p>{movie.m_description}</p>
            <button className="delete" onClick={() => handleDelete(movie)}>Delete
              </button>
            <button className="update"><Link to={`/movies/update/${movie.m_id}`}>Update</Link></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
