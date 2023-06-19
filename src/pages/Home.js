import React, { useState, useEffect } from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";
import TopRatedMovies from "../components/Home/TopRatedMovies.js";
import TopRatedShows from "../components/Home/TopRatedShows.js";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState({});
  const imgUrl = "https://image.tmdb.org/t/p/original";

  async function getMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
    );
    const data = await response.json();
    const results = data.results;
    setMovies(results.slice(1, 20));
    setActiveMovie(results[0]);
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Card>
              <CardMedia
                className="d-block w-100"
                component="img"
                image={imgUrl + activeMovie.backdrop_path}
                alt="green iguana"
              />
            </Card>
          </div>
          {movies.map((movie, i) => (
            <div key={i} className="carousel-item">
              <Card>
                <CardMedia
                  className="d-block w-100"
                  component="img"
                  image={imgUrl + movie.backdrop_path}
                  alt="green iguana"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="top-rated">
        <Box className="top-rated-movies-box">
          <Typography variant="inherit">Top Rated Movies</Typography>
          <TopRatedMovies />
        </Box>
        <Box className="top-rated-shows-box">
          <Typography variant="inherit">Top Rated Tv Shows</Typography>
          <TopRatedShows />
        </Box>
      </div>
    </>
  );
}
