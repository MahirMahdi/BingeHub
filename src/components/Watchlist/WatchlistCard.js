import { Box, Typography, Button, Card, CardMedia } from "@mui/material";
import { BsStarFill } from "react-icons/bs/index.esm.js";

export default function WatchlistCard({
  handleRemove,
  image,
  title,
  year,
  run_time,
  genres,
  overview,
  rating,
}) {
  return (
    <Card className="watchlist-card">
      <CardMedia
        component="img"
        image={`http://image.tmdb.org/t/p/w500${image}`}
      />
      <Box className="watchlist-card-info">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            <Typography variant="h5" className="watchlist-title">
              {title}
            </Typography>
            <Typography variant="inherit" className="watchlist-info">
              {year.slice(0, 4)} |{" "}
              {Array.isArray(run_time)
                ? `${run_time[0]}m`
                : `${(run_time / 60).toFixed(0)}h ${run_time % 60}m`}{" "}
              | {genres.map((genre) => genre.name + " | ")}
            </Typography>
          </span>
          <Box
            sx={{
              display: "flex",
              width: { sm: "3.5rem", lg: "5rem" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BsStarFill className="watchlist-star" />
            <Box sx={{ display: "flex" }}>
              <Typography variant="inherit" className="watchlist-rating">
                {rating.toFixed(1)}
              </Typography>
              <Typography variant="inherit" className="watchlist-rating-total">
                /10
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="watchlist-overview">
          <Typography variant="inherit">{overview}</Typography>
        </Box>
        <Button
          onClick={handleRemove}
          variant="contained"
          className="w-remove-button"
          color="error"
        >
          Remove
        </Button>
      </Box>
    </Card>
  );
}
