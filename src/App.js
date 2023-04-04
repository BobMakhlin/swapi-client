import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);

    const response = await axios.get("https://swapi.py4e.com/api/films/");
    const transformedMovies = response.data.results.map((x) => ({
      id: x.episode_id,
      title: x.title,
      releaseDate: x.release_date,
      openingText: x.opening_crawl,
    }));

    setMovies(transformedMovies);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies were found.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
