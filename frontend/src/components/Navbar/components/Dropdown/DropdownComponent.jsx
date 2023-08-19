import React, { Fragment, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FiGift } from "react-icons/fi";
import { MdFunctions, MdLogout } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";

import "./DropdownComponent.scss";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

export default function DropdownComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useUser();
  const { signOut } = useClerk();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(path) {
    if (path) {
      navigate(path);
    }
    setAnchorEl(null);
  }

  function handleSignOut() {
    signOut();
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={user?.imageUrl} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className="gap-2"
          onClick={() => {
            handleClose("/profile");
          }}
        >
          <GrUserSettings /> Profile
        </MenuItem>
        <MenuItem className="gap-2" onClick={() => handleClose("/orders")}>
          <FiGift /> Orders
        </MenuItem>
        <MenuItem className="gap-2" onClick={() => handleSignOut()}>
          <MdLogout /> Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
