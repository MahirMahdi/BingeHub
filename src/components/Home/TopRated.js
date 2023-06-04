import { Box, Typography } from "@mui/material";
import TopRatedMovies from "./TopRatedMovies.js";
import TopRatedShows from "./TopRatedShows.js";
import Footer from "../Footer.js";

export default function TopRated() {
  return (
    <div className="top-rated">
      <Box className="top-rated-movies-box">
        <Typography variant="inherit">Top Rated Movies</Typography>
        <TopRatedMovies />
      </Box>
      <Box className="top-rated-shows-box">
        <Typography variant="inherit">Top Rated Tv Shows</Typography>
        <TopRatedShows />
      </Box>
      <Footer />
    </div>
  );
}
