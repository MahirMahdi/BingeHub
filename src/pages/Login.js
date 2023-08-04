import React, { useContext, useEffect } from "react";
import { Card, Button, Box, Typography } from "@mui/material";
import { auth, provider, facebook_provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { BsGoogle, BsFacebook } from "react-icons/bs/index.esm.js";

export default function Login() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(AuthContext);

  async function popUpSignInGoogle() {
    try {
      const data = signInWithPopup(auth, provider);
      setCurrentUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async function popUpSignInFacebook() {
    try {
      const data = signInWithPopup(auth, facebook_provider);
      setCurrentUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <Box className="login-box">
      <Card
        className="login-card"
        sx={{ boxShadow: "-3px 1px 144px 16px rgba(18,103,135,1)" }}
      >
        <Box className="login-title">
          <Typography variant="inherit">Welcome to BingeHub</Typography>
        </Box>
        <Box className="button-box">
          <Button
            variant="contained"
            onClick={popUpSignInGoogle}
            sx={{
              backgroundColor: "#151513",
              textAlign: "center",
              "&:hover": { backgroundColor: "#005866" },
            }}
          >
            <BsGoogle />
            Sign In With Gogle
          </Button>
          <Button
            variant="contained"
            onClick={popUpSignInFacebook}
            sx={{
              backgroundColor: "#151513",
              textAlign: "center",
              "&:hover": { backgroundColor: "#005866" },
            }}
          >
            <BsFacebook /> Sign In With Facebook
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
