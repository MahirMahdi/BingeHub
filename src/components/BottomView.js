import { Box,Typography} from "@mui/material";
import Review from "./Review.js";
import ReviewCard from "./ReviewCard.js";
import Footer from "./Footer.js";

export default function BottomView({reviews,type_id,user_reviews}){

    return(
        <Box className="d-reviews-box">
            <Box className="reviews-box" >
                <Typography variant="h5" sx={{color:"white",fontWeight:"700"}}>User Reviews</Typography>
                <hr style={{color:"white"}}/>
                <Box className="d-reviews">
                    <Review type_id={type_id}/>
                    {user_reviews && user_reviews.length !== 0 ? user_reviews.map((review)=>(
                        <ReviewCard type_id={type_id} user_id={review.author_id} image={review.image} content={review.review} author={review.author}/>
                    )): null}
                    { reviews && reviews.length !== 0 ? reviews.map((review)=>(
                        <ReviewCard image={`http://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`} author={review.author} content={review.content}/>
                    )): null}
                </Box>
            </Box>
            <Footer/>
        </Box>
    )
};
