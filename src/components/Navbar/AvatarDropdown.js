import { useState, useContext } from "react";
import { Menu, MenuItem, Button, Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext.js";
import { Link } from "react-router-dom";

export default function AvatarDropdown({ handleLogout }) {
  const [currentUser] = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar className="avatar" src={currentUser.photoURL} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/watchlist/${currentUser.uid}`} className="wl-link">
            Watchlist
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
