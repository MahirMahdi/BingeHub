import { Box, Typography, Chip, } from "@mui/material";
import { Add } from '@mui/icons-material';

export default function MidView({casts,director,genres, handleWatchlist ,overview}){
    return(
        <Box>
            <Box className="d-genres">
                {genres.map((genre)=>(
                    <Chip label={genre.name} variant="outlined" sx={{color:"white",marginRight:"1vw"}}/>
                ))}
            </Box>
            <button className="add-watchlist" onClick={handleWatchlist}><Add fontSize="small"/>Add to Watchlist</button>
            <Box className="d-details">
                <Typography variant="inherit" sx={{color:"white"}}>{overview}</Typography>
                <hr/>
                <Box className="director-info">
                    <Typography className="details-header" variant="inherit">Director</Typography>
                    <Typography className="details-name" variant="inherit">{director? director : "Unavailable"}</Typography>
                </Box>
                <hr/>
                <Box className="cast">
                    <Typography className="details-header" variant="inherit">Cast</Typography>
                    <Box className="cast-info">
                    {casts? casts.map((cast)=>(
                        <Typography className="details-name" variant="inherit">{cast.name}</Typography>
                    )):<Typography className="details-name" variant="inherit" sx={{right:"35.5vw"}}>Unavailable</Typography>}
                    </Box>
                </Box>
                <hr/>
            </Box>
        </Box>
    )
};
