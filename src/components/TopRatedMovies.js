import { useEffect, useState, useContext } from "react";
import { Box, Grid, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext.js";
import { Link } from 'react-router-dom';


export default function TopRatedMovies(){
    const [currentUser] = useContext(AuthContext);
    const [topRatedMovies, setTopRatedMovies] = useState();

    async function getTopRatedMovies(){
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setTopRatedMovies(data.results.filter(data=> data.backdrop_path != null ).slice(0,12))
    }

    useEffect(()=>{
        getTopRatedMovies();
    },[]);

    return(
        <Box className="top-rated-movies">
            {topRatedMovies && 
            <Grid container spacing={{xs:2, sm:3}} columns={{xs:4, sm:8, md:12}}>
                {topRatedMovies.map((movie) => (
                    <Grid item xs={4} sm={4} md={4} className="top-rated-card">
                        {currentUser ? <Link to={`/detail/movie/${movie.id}/${currentUser && currentUser.uid}`} underline="none">
                            <ImageListItem key={movie.backdrop_path}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    srcSet={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    alt={movie.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                title={movie.title}
                                actionIcon={
                                    <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${movie.title}`}
                                    >
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                        </Link>: <Link to="/login" underline="none">
                        <ImageListItem key={movie.backdrop_path}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    srcSet={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    alt={movie.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                title={movie.title}
                                actionIcon={
                                    <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${movie.title}`}
                                    >
                                    </IconButton>
                                }
                                />
                            </ImageListItem>
                        </Link>}
                    </Grid>
                ))}
            </Grid>
            }
        </Box>
    )
};
