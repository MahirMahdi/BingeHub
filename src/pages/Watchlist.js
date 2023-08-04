import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
import WatchlistCard from "../components/Watchlist/WatchlistCard.js";

export default function Watchlist() {
  const [userData, setUserData] = useState();
  const params = useParams();
  const userRef = doc(db, "users", `${params.id}`);

  async function getUserData() {
    const doc = await getDoc(userRef);
    if (doc.exists()) {
      setUserData({ ...doc.data(), id: doc.id });
    } else {
      console.log("No such document");
    }
  }

  async function handleRemove(
    title,
    image,
    genres,
    overview,
    runtime,
    rating,
    year
  ) {
    const delete_doc = {
      title: title,
      image: image,
      genres: genres,
      overview: overview,
      runtime: runtime,
      rating: rating,
      year: year,
    };
    await updateDoc(userRef, { watchlist: arrayRemove(delete_doc) });
  }

  useEffect(() => {
    getUserData();
  }, [handleRemove]);

  return (
    <>
      {userData && userData.watchlist.length !== 0 ? (
        <Box className="watchlist-box">
          <Box className="watchlist">
            <Box className="watchlist-header">
              <Typography variant="h5">Watchlist</Typography>
            </Box>
            <Box sx={{ display: "grid", placeItems: "center" }}>
              {userData.watchlist.map((data) => (
                <WatchlistCard
                  key={data.title}
                  handleRemove={() => {
                    handleRemove(
                      data.title,
                      data.image,
                      data.genres,
                      data.overview,
                      data.runtime,
                      data.rating,
                      data.year
                    );
                  }}
                  year={data.year}
                  image={data.image}
                  title={data.title}
                  run_time={data.runtime}
                  overview={data.overview}
                  rating={data.rating}
                  genres={data.genres}
                />
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="watchlist-box">
          <Box className="watchlist">
            <Box className="watchlist-header">
              <Typography variant="h5">Watchlist is empty</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
