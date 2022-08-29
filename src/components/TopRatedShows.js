import { useEffect, useState, useContext } from "react";
import { Grid, Box, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext.js";
import { Link } from 'react-router-dom';


export default function TopRatedShows(){
    const [currentUser] = useContext(AuthContext);
    const [topRatedShows, setTopRatedShows] = useState();

    async function getTopRatedShows(){
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setTopRatedShows(data.results.filter(data=> data.backdrop_path != null ).slice(0,12))
    };

    useEffect(()=>{
        getTopRatedShows();
    },[]);

    return(
        <Box className="top-rated-shows">
            {topRatedShows && 
            <Grid container spacing={{xs:2, sm:3}} columns={{xs:4, sm:8, md:12}}>
                {topRatedShows.map((show) => (
                <Grid item xs={4} sm={4} md={4} className="top-rated-card">
                    {currentUser? <Link to={`/detail/tv/${show.id}/${currentUser && currentUser.uid}`} underline="none">
                        <ImageListItem key={show.backdrop_path}>
                            <img
                                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}?w=350&fit=crop&auto=format`}
                                srcSet={`https://image.tmdb.org/t/p/original${show.backdrop_path}?w=350&fit=crop&auto=format&dpr=2 2x`}
                                alt={show.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                            title={show.name}
                            actionIcon={
                                <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${show.name}`}
                                >
                                </IconButton>
                            }
                            />
                        </ImageListItem>
                    </Link>:<Link to="/login" underline="none">
                    <ImageListItem key={show.backdrop_path}>
                            <img
                                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}?w=350&fit=crop&auto=format`}
                                srcSet={`https://image.tmdb.org/t/p/original${show.backdrop_path}?w=350&fit=crop&auto=format&dpr=2 2x`}
                                alt={show.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                            title={show.name}
                            actionIcon={
                                <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${show.name}`}
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