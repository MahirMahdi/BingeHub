import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Item from "../components/Card.js";
import { useParams } from "react-router-dom";

export default function Search() {
  const params = useParams();
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${params.search}&language=en-US&page=1&include_adult=false`
    );
    const data = await response.json();
    const result = data.results;
    const finalResult = [];
    result.forEach((result) => {
      if (result.poster_path != null) {
        finalResult.push(result);
      }
    });
    setData(finalResult);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.map((data) => (
          <Item
            key={data.id}
            id={data.id}
            type={data.media_type}
            title={data.title || data.name}
            image={data.poster_path}
            overview={data.overview}
          />
        ))}
      </Grid>
    </Box>
  );
}
