import { Icon } from "@iconify/react";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown.js";
import IconButton from "@mui/material/IconButton/index.js";
import Avatar from "@mui/material/Avatar/Avatar.js";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

export default function Navbar({ home }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  function submitSearch() {
    navigate("/searched/" + search);
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="navbar" id={home && "navbar-home"}>
        <div className="logo-title">
          <Icon icon="emojione:film-projector" className="logo" />
          <a href="/">
            <h1 className="title">BingeHub</h1>
          </a>
        </div>
        <form onSubmit={submitSearch}>
          <input
            type="search"
            onChange={updateSearch}
            value={search}
            className={`search-bar ${home && "search-bar-home"}`}
            placeholder="Search..."
          />
        </form>
        <div className="normal-nav">
          <a href="/movies/1">Movies</a>
          <a href="/tvshows/1">TV Shows</a>
          {currentUser && <AvatarDropdown handleLogout={handleLogout} />}
          {!currentUser && <a href="/login">Login</a>}
        </div>
        <div className="mobile-nav">
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </IconButton>
        </div>
      </div>
      <div id={isOpen ? "navbar-mobile" : "navbar-mobile-closed"}>
        <IconButton
          sx={{ color: "white", display: isOpen ? "block" : "none" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </IconButton>
        <div className="user-info">
          <Avatar
            id="mobile-avatar"
            src={currentUser?.photoURL}
            alt="user-img"
          />
          <p>{currentUser?.displayName.split(" ")[0]}</p>
        </div>
        <div className="navbar-content">
          <a href="/movies/1">Movies</a>
          <a href="/tvshows/1">TV Shows</a>
          {currentUser && (
            <a href={`/watchlist/${currentUser.uid}`}>Watchlist</a>
          )}
          {!currentUser && <a href="/login">Login</a>}
        </div>
        {currentUser && (
          <div className="logout">
            <p onClick={handleLogout}>Logout</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
