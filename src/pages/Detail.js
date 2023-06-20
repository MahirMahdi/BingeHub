import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { updateDoc, setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { Box, Typography, Card, CardMedia, Chip, Button } from "@mui/material";
import Review from "../components/DetailView/Review.js";
import ReviewCard from "../components/DetailView/ReviewCard.js";
import GenreCard from "../components/DetailView/GenreCard.js";
import RatingForm from "../components/DetailView/RatingForm.js";
import { Add } from "@mui/icons-material";
import RatingDetails from "../components/DetailView/RatingDetails.js";

export default function Detail() {
  const [details, setDetails] = useState();
  const [genre, setGenre] = useState();
  const [cast, setCast] = useState();
  const [director, setDirector] = useState();
  const [ratingInfo, setRatingInfo] = useState();
  const [reviews, setReviews] = useState();
  const [reviewInfo, setReviewInfo] = useState();
  const [formState, setFormState] = useState("inactive");
  const params = useParams();
  const type = params.type;
  const id = params.id;
  const user_id = params.user_id;
  const userRef = doc(db, "users", user_id);
  const reviewRef = doc(db, "users", "reviews");
  const watchlist_doc = details && {
    title: details.name || details.title,
    image: details.poster_path,
    genres: details.genres,
    runtime: details.episode_run_time || details.runtime,
    rating: details.vote_average,
    year: details.release_date || details.first_air_date,
    overview: details.overview,
  };

  function showForm() {
    setFormState("active");
  }

  function hideForm() {
    setFormState("inactive");
  }

  localStorage.setItem("userID", user_id);

  const handleWatchlist = async () => {
    const doc = await getDoc(userRef);
    if (doc.exists()) {
      await updateDoc(userRef, { watchlist: arrayUnion(watchlist_doc) });
      window.location.reload();
    } else {
      await setDoc(userRef, { user_id: user_id, watchlist: [watchlist_doc] });
      window.location.reload();
    }
  };

  async function getUserData() {
    const doc = await getDoc(userRef);
    if (doc.exists()) {
      const data = { ...doc.data(), id: doc.id };
      const user_ratings = data.ratings.filter(
        (rating) => rating.type_id === id
      );
      setRatingInfo(user_ratings[0]);
    } else {
      console.log("No such document");
    }
  }

  async function getUserReviews() {
    const doc = await getDoc(reviewRef);
    if (doc.exists()) {
      const data = { ...doc.data() };
      const user_reviews = data.reviews.filter(
        (review) => review.type_id === id
      );
      setReviewInfo(user_reviews);
    } else {
      console.log("No such document");
    }
  }

  async function getDetailData() {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    );
    const data = await response.json();

    setDetails(data);
  }
  async function getSimilarGenre() {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    const result = data.results.slice(0, 4);
    setGenre(result);
  }

  async function getCredits() {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
    );
    const data = await response.json();
    const cast = data.cast.slice(0, 4);
    const director = data.crew.filter((crew) => crew.job === "Director")[0];

    setCast(cast);
    setDirector(director);
  }

  async function getReviews() {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    setReviews(data.results);
  }

  useEffect(() => {
    getDetailData();
    getSimilarGenre();
    getUserData();
    getCredits();
    getReviews();
    getUserReviews();
  }, [type, id]);

  return (
    <>
      {genre && details && (
        <Box sx={{ padding: "1rem", width: "100vw" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {details.title && (
                <span variant="inherit" className="d-title">
                  {details.title}
                </span>
              )}
              {details.name && (
                <span variant="inherit" className="d-title">
                  {details.name}
                </span>
              )}
              <span className="d-info">
                {details.release_date && (
                  <span variant="inherit">
                    {details.release_date.slice(0, 4)}
                  </span>
                )}
                {details.first_air_date && (
                  <span variant="inherit">
                    {details.first_air_date.slice(0, 4)}
                  </span>
                )}
                {details.runtime && (
                  <span variant="inherit">
                    {(details.runtime / 60).toFixed(0)}h {details.runtime % 60}m
                  </span>
                )}
                {details.episode_run_time && (
                  <span variant="inherit">
                    {details.episode_run_time.slice(0, 1)}m
                  </span>
                )}
                <span variant="inherit">
                  {details.status && details.status}
                </span>
              </span>
            </div>
            <RatingDetails
              rating={details?.vote_average}
              user_rating={ratingInfo && ratingInfo.rate}
              showForm={showForm}
              totalVote={details?.vote_count}
              mobile={false}
            />
          </Box>
          <Box className="poster-area">
            <Card className="poster">
              <CardMedia
                component="img"
                className="poster-img"
                image={
                  `https://image.tmdb.org/t/p/original` + details?.backdrop_path
                }
              />
            </Card>
            <Box className="similar-genre-area">
              {genre?.map((gen, i) => (
                <GenreCard
                  key={i}
                  user_id={user_id}
                  type={type}
                  img={gen.backdrop_path}
                  id={gen.id}
                />
              ))}
            </Box>
          </Box>
          <RatingForm
            type_id={id}
            hideForm={hideForm}
            title={details?.title}
            name={details?.name}
            formState={formState}
            buttonState={false}
          />
          <span className="big-screen-watchlist">
            <div className="d-genres">
              {details.genres.map((genre, i) => (
                <Chip
                  key={i}
                  label={genre.name}
                  variant="outlined"
                  sx={{ color: "white", marginRight: "1vw" }}
                />
              ))}
            </div>
            <div className="mobile-add-watchlist">
              <RatingDetails
                rating={details?.vote_average}
                user_rating={ratingInfo && ratingInfo.rate}
                showForm={showForm}
                totalVote={details?.vote_count}
                mobile={true}
              />
              <Button
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#005866",
                  color: "white",
                  height: "max-content",
                  width: "max-content",
                  padding: ".5rem",
                }}
                onClick={handleWatchlist}
              >
                Add to Watchlist
              </Button>
            </div>
          </span>
          <div className="d-details">
            <span>{details.overview}</span>
            <hr />
            <div className="director-info">
              <span className="details-header">Director</span>
              <span className="details-name">
                {director ? director.name : "Unavailable"}
              </span>
            </div>
            <hr />
            <div className="cast">
              <span className="details-header">Cast</span>
              <div className="cast-info">
                {cast ? (
                  cast.map((cast, i) => (
                    <span key={i} className="details-name">
                      {cast.name}
                    </span>
                  ))
                ) : (
                  <span className="details-name">Unavailable</span>
                )}
              </div>
            </div>
            <hr />
          </div>
          <Box className="reviews-box">
            <Typography variant="h5" sx={{ color: "white", fontWeight: "700" }}>
              User Reviews
            </Typography>
            <hr style={{ color: "white" }} />
            <Box className="d-reviews">
              <Review type_id={id} />
              {reviewInfo && reviewInfo.length !== 0
                ? reviewInfo.map((review, i) => (
                    <ReviewCard
                      key={i}
                      type_id={id}
                      user_id={review.author_id}
                      image={review.image}
                      content={review.review}
                      author={review.author}
                    />
                  ))
                : null}
              {reviews && reviews.length !== 0 ? (
                reviews.map((review, i) => (
                  <ReviewCard
                    key={i}
                    image={
                      review.author_details.avatar_path &&
                      `http://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                    }
                    author={review.author}
                    content={review.content}
                  />
                ))
              ) : (
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: "700" }}
                >
                  No Reviews
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
