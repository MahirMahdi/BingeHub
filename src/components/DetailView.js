import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { db } from "../firebase.js";
import { updateDoc,setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import TopView from "./TopView.js";
import MidView from "./MidView.js";
import BottomView from "./BottomView.js";

export default function DetailView(){
    const [details, setDetails] = useState();
    const [genre, setGenre] = useState();
    const [cast, setCast] = useState();
    const [director, setDirector] = useState();
    const [ratingInfo, setRatingInfo] = useState();
    const [reviews, setReviews] = useState();
    const[reviewInfo, setReviewInfo] = useState();
    const params = useParams();
    const type = params.type;
    const id = params.id;
    const user_id = params.user_id
    const userRef = doc(db, "users", user_id);
    const reviewRef = doc(db, "users", "reviews"); 
    const watchlist_doc = details && {title: details.name || details.title, image: details.poster_path, genres:details.genres, runtime: details.episode_run_time || details.runtime, rating:details.vote_average, year: details.release_date || details.first_air_date, overview:details.overview};

    localStorage.setItem("userID", user_id);

    const handleWatchlist = async()=>{
        const doc = await getDoc(userRef);
            if(doc.exists()){
                await updateDoc(userRef,{watchlist : arrayUnion(watchlist_doc)})
                window.location.reload();
            }else{
                await setDoc(userRef, {user_id: user_id, watchlist:[watchlist_doc]});
                window.location.reload();
            }
    };

    async function getUserData(){
        const doc = await getDoc(userRef);
        if(doc.exists()){
            const data = {...doc.data(), id: doc.id};
            const user_ratings = data.ratings.filter(rating => rating.type_id === id);
            setRatingInfo(user_ratings[0]);
        }else{
            console.log("No such document");
        }
    };

    async function getUserReviews(){
        const doc = await getDoc(reviewRef);
        if(doc.exists()){
            const data = {...doc.data()};
            const user_reviews = data.reviews.filter(review => review.type_id === id);
            setReviewInfo(user_reviews);
        }else{
            console.log("No such document");
        }
    };

    async function getDetailData(){
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`);
        const data = await response.json();
        setDetails(data);
    };
    async function getSimilarGenre(){
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        const result = data.results.slice(0,4);
        setGenre(result);
    };

    async function getCredits(){
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`);
        const data = await response.json();
        const cast = data.cast.slice(0,4);
        const director = data.crew.filter(crew => crew.job === "Director")[0];
        setCast(cast);
        setDirector(director);
    };

    async function getReviews(){
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setReviews(data.results);
    }



    useEffect(()=>{
        getDetailData();
        getSimilarGenre();
        getUserData();
        getCredits();
        getReviews();
        getUserReviews();
    },[]);
    return(
        <Box>
            {genre && details &&
            <Box>
                <TopView user_rating={ratingInfo && ratingInfo.rate} id={id} user_id={user_id} name={details.name} title={details.title} rating={details.vote_average} totalVote={details.vote_count} date={details.release_date} tdate={details.first_air_date} time={details.runtime} ttime={details.episode_run_time} status={details.status} image={details.backdrop_path} img1={genre[0].backdrop_path} img2={genre[1].backdrop_path} img3={genre[2].backdrop_path} img4={genre[3].backdrop_path} id_1={genre[0].id} id_2={genre[1].id} id_3={genre[2].id} id_4={genre[3].id} type={type} />
                <MidView casts={cast && cast} director={director && director.name} genres={details.genres} handleWatchlist={handleWatchlist} overview={details.overview}/>
                <BottomView user_reviews={reviewInfo && reviewInfo } reviews={reviews && reviews} type_id={id}/>
            </Box>
            }
        </Box>
    )
};
