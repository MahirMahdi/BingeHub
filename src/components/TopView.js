import { Box,Card,CardMedia,Typography} from "@mui/material";
import { useState } from "react";
import { BsStarFill,BsStar } from "react-icons/bs/index.esm.js";
import RatingForm from "./RatingForm.js";

export default function TopView({id,user_id,type,id_1,id_2,id_3,id_4,name,title,user_rating,rating,totalVote,date,time,status,tdate,ttime,image,img1,img2,img3,img4}){
    const [formState, setFormState] = useState("inactive")
    
    function showForm(){
        setFormState("active")
    };
    
    function hideForm(){
        setFormState("inactive")
    };

    return(
        <Box>
            <Box className="title-box">
                {title && <Typography variant="inherit" className="d-title">{title}</Typography>}        
                {name && <Typography variant="inherit" className="d-title">{name}</Typography>}
            </Box>
            <Typography variant="inherit" className="d-rating">BHub Rating</Typography>
            <BsStarFill className="d-rate"/>
            <Typography variant="inherit" className="d-ratingno">{rating.toFixed(1)}</Typography><Typography variant="inherit" className="total-score">/10</Typography>
            <Typography variant="inherit" className="total-vote">{(totalVote/1000).toFixed(1)}K</Typography>
            <Typography variant="inherit" className="u-rating">Your Rating</Typography>
            <button onClick={showForm} type="text" className="rate">
                {user_rating &&<div className="user-rating"><BsStarFill className="u-rate"/>{`${user_rating}/10`}</div>}{!user_rating && <div className="user-rating"><BsStar className="u-rate"/>Rate</div> }
            </button>
            <Box className="d-info">
                {date && <Typography variant="inherit">{(date).slice(0,4)}</Typography>}
                {tdate && <Typography variant="inherit">{(tdate).slice(0,4)}</Typography>}
                {time && <Typography variant="inherit">{(time/60).toFixed(0)}h {(time%60)}m</Typography> }
                {ttime && <Typography variant="inherit">{ttime.slice(0,1)}m</Typography>}
                <Typography variant="inherit">{status && status}</Typography>
            </Box>
            <Box className="poster-area">
                <Card className="poster">
                        <CardMedia 
                        component="img"
                        className="poster-img"
                        image={`https://image.tmdb.org/t/p/original`+ image}
                        />
                </Card>
                <Box className="similar-genre-area">
                    <a href={`/detail/${type}/${id_1}/${user_id}`}>
                        <Card>
                            <CardMedia 
                            component="img"
                            className="similar-genre-image"
                            image={`https://image.tmdb.org/t/p/original`+ img1}/>
                        </Card>
                    </a>
                    <a href={`/detail/${type}/${id_2}/${user_id}`}>
                        <Card>
                            <CardMedia 
                            component="img"
                            className="similar-genre-image"
                            image={`https://image.tmdb.org/t/p/original`+ img2}/>
                        </Card>
                    </a>
                    <a href={`/detail/${type}/${id_3}/${user_id}`}>
                        <Card>
                            <CardMedia 
                            component="img"
                            className="similar-genre-image"
                            image={`https://image.tmdb.org/t/p/original`+ img3}/>
                        </Card>
                    </a>
                    <a href={`/detail/${type}/${id_4}/${user_id}`}>
                        <Card>
                            <CardMedia 
                            component="img"
                            className="similar-genre-image"
                            image={`https://image.tmdb.org/t/p/original`+ img4}/>
                        </Card>
                    </a>
                </Box>
            </Box>
            <RatingForm type_id={id} hideForm={hideForm} title={title} name={name} formState={formState} buttonState={false}/>
        </Box>
        )
    };
