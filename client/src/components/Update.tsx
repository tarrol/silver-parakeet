import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Update() {
  const [movie, setMovie] = useState({
    m_title: "",
    m_year: "",
    m_run_time: "",
    m_description: "",
    m_director: "",
    m_rating_id: "",
    m_genre_id:""

  })
console.log(movie)
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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  let navigate = useNavigate();
  let location = useLocation();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await axios.put('http://localhost:3001' + location.pathname, movie);
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <h1>Update a movie:</h1>
      <div className="form" style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: 'column', marginRight: '400px', marginTop: "20px", width: '400px' }}>
          <input type="text" value={movie.m_title} onChange={handleChange} name="m_title" />
          <input type="text" value={movie.m_year} onChange={handleChange} name='m_year' />
          <input type="text" value={movie.m_run_time} onChange={handleChange} name="m_run_time" />
          <input type="text" value={movie.m_description} onChange={handleChange} name="m_description" />
          <input type="text" value={movie.m_director} onChange={handleChange} name='m_director' />
          <input type="text" value={movie.m_rating_id} onChange={handleChange} name="m_rating_id" />
          <input type="text" value={movie.m_genre_id} onChange={handleChange} name="m_genre_id" />
          <button onClick={handleClick}>Submit</button>
        </div>

        <div style={{ display: "absolute", float: 'right' }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>
            <div style={{ marginBottom: "10px", marginRight: "10px" }}>
              <h4>Ratings key: </h4>
              <p>1 = NR </p>
              <p>2 = G </p>
              <p>3 = PG </p>
              <p>4 = PG-13 </p>
              <p>5 = R </p>
              <p>6 = NC-17</p>
            </div>
            <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
              <h4>Genre Key:</h4>
              <p>1 = Action</p>
              <p>2 = Adventure</p>
              <p>3 = Animation</p>
              <p>4 = Biography</p>
              <p>5 = Comedy</p>
              <p>6 = Crime</p>
              <p>7 = Drama</p>
              <p>8 = Family</p>
              <p>9 = Fantasy</p>
              <p>10 = Film Noir</p>
              <p>11 = History</p>
              <p>12 = Horror</p>
              <p>13 = Musical</p>
              <p>14 = Mystery</p>
              <p>15 = Romance</p>
              <p>16 = Sci-Fi</p>
              <p>17 = Sport</p>
              <p>18 = Thriller</p>
              <p>19 = War</p>
              <p>20 = Western</p>
            </div>
          </div>
        </div>
      </div>
      <button><Link to="/">Back</Link></button>
    </div>
  )
}

export default Update