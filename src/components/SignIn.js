import React,{ useContext } from "react"
import { Card,Button,Box,Typography} from "@mui/material";
import { auth,provider,facebook_provider,twitter_provider } from '../firebase.js'
import { signInWithPopup } from "firebase/auth";
import { AuthContext} from "../contexts/AuthContext.js";
import { useNavigate } from 'react-router-dom';
import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs/index.esm.js";
import Footer from "./Footer.js";

export default function SignIn(){
    const navigate = useNavigate();
    const [currentUser,setCurrentUser] = useContext(AuthContext);

    function popUpSignInGoogle(){
        signInWithPopup(auth,provider)
            .then((result)=>{
                const user = result.user;
                setCurrentUser(user)
                navigate("/")
            }).catch((error)=>{
                console.log(error);
            })
        };

    function popUpSignInFacebook(){
        signInWithPopup(auth,facebook_provider)
            .then((result)=>{
                const user = result.user;
                console.log(user);
                setCurrentUser(user)
                navigate("/")
            }).catch((error)=>{
                console.log(error);
            })
        };

    function popUpSignInTwitter(){
        signInWithPopup(auth,twitter_provider)
            .then((result)=>{
                const user = result.user;
                setCurrentUser(user)
                navigate("/")
            }).catch((error)=>{
                console.log(error);
            })
        };
        
    return(
        <Box className="login-box">
            <Card className="login-card" sx={{boxShadow:"-3px 1px 144px 16px rgba(18,103,135,1)"}}> 
                <Box className="login-title">
                <Typography variant="inherit">Welcome to BingeHub</Typography>
                </Box>
                <Box className="button-box">
                    <Button variant="contained" onClick={popUpSignInGoogle} sx={{backgroundColor:"#151513",textAlign:"center","&:hover":{backgroundColor:"#005866"}}}><BsGoogle/>Sign In With Gogle</Button>
                    <Button variant="contained" onClick={popUpSignInFacebook} sx={{backgroundColor:"#151513",textAlign:"center","&:hover":{backgroundColor:"#005866"}}} ><BsFacebook/> Sign In With Facebook</Button>
                    <Button variant="contained" onClick={popUpSignInTwitter} sx={{backgroundColor:"#151513", textAlign:"center","&:hover":{backgroundColor:"#005866"}}} ><BsTwitter/> Sign In With Twitter</Button>
                </Box>
            </Card>
            <Footer/>
        </Box>
    )
};