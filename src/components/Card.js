import React,{useContext} from 'react';
import { Grid,Card,CardMedia,CardContent,Typography,Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.js';
import { useNavigate,useParams } from 'react-router-dom';
import '../App.css';


export default function Item({id,type,title,image,overview}){
    const [currentUser] = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    function View(){
        if(!currentUser){
            navigate("/login")
        }
        else{
            navigate(`/detail/${type}/${id}/${currentUser.uid}`)
        }
    };

    return(
        <Grid sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}} item xs={4} sm={4} md={4}>
            <Card sx={{ maxWidth:275, display:"grid", placeItems:"center",objectFit:"cover"}}>
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/original${image}`}/>
                <CardContent >
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {overview.slice(0,50)+'...'}
                    </Typography>
                </CardContent>
                <Button variant="contained" onClick={View} sx={{marginBottom:"2.5vh",backgroundColor:"#005866"}}>View</Button>
            </Card> 
        </Grid>
    )
};
