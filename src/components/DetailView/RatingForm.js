import { Card, Typography, Rating, Button } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { useState } from "react";
import { db } from "../../firebase.js";
import { updateDoc, setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";

export default function RatingForm({
  type_id,
  title,
  name,
  formState,
  buttonState,
  hideForm,
}) {
  const [value, setValue] = useState();
  const userID = localStorage.getItem("userID");
  const userRef = doc(db, "users", userID);

  async function handleSubmit(value) {
    const rating_doc = { type_id: type_id, rate: value };
    const doc = await getDoc(userRef);
    if (doc.exists()) {
      await updateDoc(userRef, { ratings: arrayUnion(rating_doc) });
    } else {
      await setDoc(userRef, { user_id: userID, ratings: [rating_doc] });
    }
    window.location.reload();
  }

  return (
    <Card
      className={`rating-form ${formState}`}
      sx={{ backgroundColor: "#3d3d3b" }}
    >
      <Clear onClick={hideForm} className="clear" />
      <Typography variant="inherit" className="rate-this">
        RATE THIS
      </Typography>
      {title && (
        <Typography variant="inherit" className="rating-title">
          {title}
        </Typography>
      )}
      {name && (
        <Typography variant="inherit" className="rating-title">
          {name}
        </Typography>
      )}
      <Rating
        defaultValue={0}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        value={value}
        max={10}
        size="large"
        precision={1}
        className="rating-value"
        sx={{ color: "#005866" }}
      />
      <Button
        variant="contained"
        className="rate-button"
        onClick={() => {
          handleSubmit(value);
        }}
        disabled={buttonState}
        sx={{
          backgroundColor: "#005866",
          "&:hover": { backgroundColor: "#04363d" },
        }}
      >
        Rate
      </Button>
    </Card>
  );
}
