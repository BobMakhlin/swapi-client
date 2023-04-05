import React, { useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://swapi.py4e.com/api/films/");
      const transformedMovies = response.data.results.map((x) => ({
        id: x.episode_id,
        title: x.title,
        releaseDate: x.release_date,
        openingText: x.opening_crawl,
      }));

      setMovies(transformedMovies);
    } catch (err) {
      console.log("err:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <p>No movies were found.</p>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>An error has occurred.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
