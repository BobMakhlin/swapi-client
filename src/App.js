import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = () => {
    axios.get("https://swapi.py4e.com/api/films/").then((response) => {
      const transformedMovies = response.data.results.map((x) => ({
        id: x.episode_id,
        title: x.title,
        releaseDate: x.release_date,
        openingText: x.opening_crawl,
      }));
      setMovies(transformedMovies);
    });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
