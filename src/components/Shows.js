import React,{ useState,useEffect } from "react";
import { Box,Pagination,Grid } from "@mui/material";
import Item from './Card.js'
import { useNavigate,useParams } from 'react-router-dom';
import Footer from "./Footer.js";

export default function Shows(){
    const navigate = useNavigate();
    const params = useParams();
    const page = params.page;
    const [shows, setShows] = useState([]);
    
    async function getShows(){
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${page}`)
        const data = await response.json();
        const result = data.results;
        setShows(result);
    };

    async function handleChange(e){
        const currentPage = e.target.innerText;
        navigate('/tvshows/'+ currentPage);
        window.location.reload()
    };

    useEffect(()=>{
        getShows();
    },[]);

    return(
        <div>
            <Box sx={{position:"absolute",flexGrow:1, mt:27}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {shows.map((show)=>(
                        <Item key={show.id} id={show.id} type={"tv"} title={show.name} image={show.poster_path} overview={show.overview}/>
                    ))}
                </Grid>
                <Pagination count={10} page={parseInt(page)} onClick={handleChange} color={"primary"} className="pagination" hidePrevButton hideNextButton/>
                <Footer/>
            </Box>
        </div>
    )
};
