import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FiGift } from "react-icons/fi";
import { MdFavoriteBorder, MdLogout } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownComponent.scss";

export default function DropdownComponent() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <Dropdown id="dropdown-menu">
      <Dropdown.Toggle id="dropdown-basic">
        <img src={user?.imageUrl} className="user-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-1 ps-2">
        <Dropdown.Item className="mt-2">
          <Link
            id="menu-option"
            className="custom-link d-flex gap-2 align-items-center"
            to={"/profile"}
          >
            <GrUserSettings />
            Profile
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="mt-3 mb-2">
          <Link
            id="menu-option"
            className="custom-link d-flex gap-2 align-items-center"
            to={"/orders"}
          >
            <FiGift /> Orders
          </Link>
        </Dropdown.Item>

        <Dropdown.Item className="mt-3 mb-2">
          <Link
            id="menu-option"
            className="custom-link d-flex gap-2 align-items-center"
            onClick={() => signOut()}
            disabled
          >
            <MdLogout /> Sing out
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
