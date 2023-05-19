import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    const fetchAllMovies = async() =>{
      try{
        const res = await axios.get(" ")
      } catch(err){
        console.log(err)
      }
    }
  }, [])
  return (
    <div className="App">
      <a>Hello</a>
    </div>
  );
}

export default App;
