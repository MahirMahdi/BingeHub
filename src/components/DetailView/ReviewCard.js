import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import { Box, Card, Typography, Avatar, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AlertModal from "./Modal.js";

export default function ReviewCard({
  handleRemove,
  handleClose,
  handleOpen,
  open,
  user_id,
  content,
  image,
  author,
}) {
  const [currentUser] = useContext(AuthContext);

  return (
    <>
      <Card className="review-card" sx={{ backgroundColor: "black" }}>
        <Box className="author-info">
          <Avatar src={image} className="author-avatar" />
          <Typography variant="h6">{author}</Typography>
          {currentUser && user_id === currentUser.uid ? (
            <Button
              startIcon={<Delete />}
              onClick={() => handleOpen()}
              sx={{
                position: "absolute",
                top: ".25rem",
                right: "3.5rem",
                width: "max-content",
              }}
              color="error"
            ></Button>
          ) : null}
        </Box>
        <Box className="review-content">
          <Typography variant="inherit">{content}</Typography>
        </Box>
      </Card>
      <AlertModal
        handleClose={() => handleClose()}
        handleRemove={() => handleRemove()}
        open={open}
      />
    </>
  );
}
