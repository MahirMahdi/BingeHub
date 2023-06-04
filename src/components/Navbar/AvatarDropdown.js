import React, { useState, useContext } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Logout, Add } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext.js";
import { useNavigate, Link } from "react-router-dom";

export default function AvatarDropdown({ handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {currentUser && (
        <React.Fragment>
          <Box
            className="avatar-dropdown"
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar className="avatar" src={currentUser.photoURL} />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 65,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem sx={{ "&:hover": { backgroundColor: "#005866" } }}>
              <Link to={`/watchlist/${currentUser.uid}`} className="wl-link">
                <ListItemIcon>
                  <Add fontSize="small" />
                </ListItemIcon>
                Watchlist
              </Link>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ "&:hover": { backgroundColor: "#005866" } }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </div>
  );
}
