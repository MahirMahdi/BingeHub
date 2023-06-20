import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import { Box, Card, Typography, Avatar, Button } from "@mui/material";
import { db } from "../../firebase.js";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";

export default function ReviewCard({
  type_id,
  user_id,
  content,
  image,
  author,
}) {
  const [currentUser] = useContext(AuthContext);
  const reviewRef = doc(db, "users", "reviews");

  async function handleRemove() {
    const delete_doc = {
      author: author,
      author_id: currentUser.uid,
      image: image,
      review: content,
      type_id: type_id,
    };
    await updateDoc(reviewRef, { reviews: arrayRemove(delete_doc) });
    window.location.reload();
  }

  return (
    <Card className="review-card" sx={{ backgroundColor: "black" }}>
      <Box className="author-info">
        <Avatar src={image} className="author-avatar" />
        <Typography variant="h6">{author}</Typography>
        {currentUser && user_id === currentUser.uid ? (
          <Button
            onClick={handleRemove}
            className="r-remove-button"
            variant="contained"
            color="error"
          >
            X
          </Button>
        ) : null}
      </Box>
      <Box className="review-content">
        <Typography variant="inherit">{content}</Typography>
      </Box>
    </Card>
  );
}
