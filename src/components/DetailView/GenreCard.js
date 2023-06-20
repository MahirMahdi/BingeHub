import { Link } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";

export default function GenreCard({ type, id, user_id, img }) {
  return (
    img && (
      <Link to={`/detail/${type}/${id}/${user_id}`}>
        <Card>
          <CardMedia
            component="img"
            className="similar-genre-image"
            image={`https://image.tmdb.org/t/p/original` + img}
          />
        </Card>
      </Link>
    )
  );
}
