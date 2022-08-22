import { useContext, useState } from "react";
import { Box, Button } from "@mui/material";
import { db } from "../firebase.js";
import { updateDoc,setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext.js";

export default function Review({type_id}){
    const [review, setReview] = useState();
    const[currentUser] = useContext(AuthContext);
    const reviewRef = doc(db, "users", "reviews");

    function handleChange(e){
        setReview(e.target.value)
    };

    async function handleSubmit(review){
        const review_doc = {type_id: type_id, review: review, author_id: currentUser.uid, author: currentUser.displayName, image: currentUser.photoURL};
        const doc = await getDoc(reviewRef);
            if(doc.exists()){
                await updateDoc(reviewRef,{reviews : arrayUnion(review_doc)})
            }else{
                await setDoc(reviewRef, { reviews:[review_doc]});
            }; 
            window.location.reload();    
    };

    return(
        <Box className="review-form">
            <textarea value={review} onChange={handleChange} placeholder="Add a review..."></textarea>
            <Button className="review-button" variant="contained" onClick={()=>{handleSubmit(review)}} sx={{backgroundColor:"#005866"}}>Submit</Button>
        </Box>
    )
};