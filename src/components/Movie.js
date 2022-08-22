import React,{ useState, useEffect } from "react";
import { Box,Pagination, Grid } from "@mui/material";
import Item from './Card.js'
import { useNavigate,useParams } from 'react-router-dom';
import Footer from "./Footer.js";

export default function Movie(){
    const navigate = useNavigate();
    const params = useParams();
    const page = params.page;
    const [movies, setMovies] = useState([]);

    async function getMovies(){
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        const result = data.results;
        setMovies(result);
    };

    useEffect(()=>{
        getMovies();
    },[]);

    async function handleChange(e){
        const currentPage = e.target.innerText;
        navigate('/movies/'+ currentPage);
        window.location.reload()
    };
    
    return(
        <div>
            <Box sx={{position:"absolute",flexGrow:1, mt:27}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {movies.map((movie)=>(
                        <Item key={movie.id} id={movie.id} type={"movie"} title={movie.title} image={movie.poster_path} overview={movie.overview}/>
                    ))}
                </Grid>
                <Pagination count={10} page={parseInt(page)} onClick={handleChange} color={"primary"} className="pagination" hidePrevButton hideNextButton/>
                <Footer/>
            </Box>
        </div>
    )
};
