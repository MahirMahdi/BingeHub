import { Box } from "@mui/material";
import { BsStarFill, BsStar } from "react-icons/bs/index.esm.js";

export default function RatingDetails({
  user_rating,
  rating,
  showForm,
  totalVote,
  mobile,
}) {
  return (
    <div className={mobile ? "rating-details-mobile" : "rating-details"}>
      <span>
        <span className="d-rating">BHub Rating</span>
        <div className="bhub-rating-details">
          <div className="bhub-rating">
            <BsStarFill className="d-rate" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: ".25rem",
              }}
            >
              <span className="d-ratingno">{rating.toFixed(1)}</span>
              <span className="total-score">/10</span>
            </Box>
          </div>
          <p className="total-vote">{(totalVote / 1000).toFixed(1)}K</p>
        </div>
      </span>
      <span>
        <span className="u-rating">Your Rating</span>
        <button onClick={showForm} type="text" className="rate">
          {user_rating && (
            <div className="user-rating">
              <BsStarFill className="u-rate" />
              {`${user_rating}/10`}
            </div>
          )}
          {!user_rating && (
            <div className="user-rating">
              <BsStar className="u-rate" />
              Rate
            </div>
          )}
        </button>
      </span>
    </div>
  );
}
