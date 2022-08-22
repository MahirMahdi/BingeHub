import React,{ useState,useEffect } from "react";
import { Card,CardMedia } from '@mui/material'

export default function Trending(){
    const [movies,setMovies] = useState([])
    const [activeMovie, setActiveMovie] = useState({});
    const imgUrl = 'https://image.tmdb.org/t/p/original';

    async function getMovies(){
        const response = await  fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`);
        const data = await response.json();
        const results = data.results;
        setMovies(results.slice(1,20));
        setActiveMovie(results[0]);
    };

    useEffect(()=>{
        getMovies()
    },[]);

    return(
        <div style={{position:"absolute",width:"100vw",objectFit:"contain"}}>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Card>
                            <CardMedia
                            className="d-block w-100"
                            component="img"
                            image={imgUrl+ activeMovie.backdrop_path}
                            alt="green iguana"
                        />
                        </Card>
                    </div>
                    {movies.map((movie)=>(
                        <div className="carousel-item">
                            <Card>
                                <CardMedia
                                className="d-block w-100"
                                component="img"
                                image={imgUrl+ movie.backdrop_path}
                                alt="green iguana"
                            />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )
    };