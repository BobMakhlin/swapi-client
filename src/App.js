import React, { useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";
import AddMovie from "./components/AddMovie";

const URL =
  "https://react-http-c16bc-default-rtdb.europe-west1.firebasedatabase.app/movies.json";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(URL);
      const transformedMovies = Object.entries(response.data).map(
        ([id, movie]) => ({
          id,
          ...movie,
        })
      );
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

  const addMovieHandler = useCallback((movie) => {
    axios.post(URL, movie);
  }, []);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
