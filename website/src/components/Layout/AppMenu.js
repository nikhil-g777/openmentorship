import React, { useState } from "react";
import styled from "styled-components";
import LogoNavBar from "../../images/LogoNavBar.png";
import userIcon from "../../images/user.svg";
import backIcon from "../../images/backIcon.svg";

import { Divider, MenuItem, Menu, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";
import "./index.css";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14.69px;
  // -webkit-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  // -moz-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  // box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
`;

const Picture = styled.div`
  width: 32px;
  height: 32px;
`;

const LogoImg = styled(Picture)`
  background-size: cover;
  background-image: url(${LogoNavBar});
  margin-right: 150px;
`;

const UserIconWrapper = styled.div`
  background: #4e96cb;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserIcon = styled(Picture)`
  background-image: url(${userIcon});
  width: 22px;
  height: 22px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
  }
`;

const BackButton = styled(Picture)`
  background-image: url(${backIcon});
  background-position: center;
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
  }
`;

const MenuLink = styled(Link)`
  color: #000;
  &:hover {
    text-decoration: none;
    color: #000;
  }
`;

const DropDownMenu = (props) => {
  const pathname = window.location.pathname;
  // const [user, setUser] = useContext(UserContext);

  let token = JSON.parse(localStorage.getItem("token"));

  function logOut() {
    // setUser({});
    localStorage.removeItem("token");
  }

  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={props.open}
        onClose={props.handleClose}
        style={{ marginTop: 40 }}
      >
        {/* {props.registrationMenu ? ( */}
        {/* {user.token == "" ? ( */}
        {!token ? (
          <>
            <div className="web-navbar">
              <MenuLink to="/">
                <MenuItem onClick={props.handleClose}>About</MenuItem>
              </MenuLink>
              <MenuLink to="/FAQ">
                <MenuItem
                  onClick={props.handleClose}
                  selected={pathname === "/FAQ"}
                >
                  FAQ
                </MenuItem>
              </MenuLink>
              <MenuLink to="/login">
                <MenuItem
                  onClick={props.handleClose}
                  selected={pathname === "/login"}
                >
                  Log In
                </MenuItem>
              </MenuLink>
            </div>
            <div className="mobile-navbar">
              <MenuLink to="/profile">
                <MenuItem
                  disabled
                  onClick={props.handleClose}
                  selected={pathname === "/profile"}
                >
                  Profile
                </MenuItem>
              </MenuLink>
              <MenuLink to="/sessions">
                <MenuItem
                  onClick={props.handleClose}
                  selected={pathname === "/sessions"}
                >
                  Sessions
                </MenuItem>
              </MenuLink>
              <MenuLink to="/matches">
                <MenuItem
                  onClick={props.handleClose}
                  selected={pathname === "/matches"}
                >
                  Matches
                </MenuItem>
              </MenuLink>
              <MenuLink to="/chat">
                <MenuItem
                  disabled
                  onClick={props.handleClose}
                  selected={pathname === "/chat"}
                >
                  Chat
                </MenuItem>
              </MenuLink>
              <MenuLink to="/">
                <MenuItem onClick={logOut}>LogOut</MenuItem>
              </MenuLink>
              <Divider variant="middle" />
              <MenuLink to="/">
                <MenuItem onClick={props.handleClose}>About</MenuItem>
              </MenuLink>
              <MenuLink to="/FAQ">
                <MenuItem
                  onClick={props.handleClose}
                  selected={pathname === "/FAQ"}
                >
                  FAQ
                </MenuItem>
              </MenuLink>
            </div>
          </>
        ) : (
          <div>
            <MenuLink to="/profile">
              <MenuItem
                disabled
                onClick={props.handleClose}
                selected={pathname === "/profile"}
              >
                Profile
              </MenuItem>
            </MenuLink>
            <MenuLink to="/sessions">
              <MenuItem
                onClick={props.handleClose}
                selected={pathname === "/sessions"}
              >
                Sessions
              </MenuItem>
            </MenuLink>
            <MenuLink to="/matches">
              <MenuItem
                onClick={props.handleClose}
                selected={pathname === "/matches"}
              >
                Matches
              </MenuItem>
            </MenuLink>
            <MenuLink to="/chat">
              <MenuItem
                disabled
                onClick={props.handleClose}
                selected={pathname === "/chat"}
              >
                Chat
              </MenuItem>
            </MenuLink>
            <MenuLink to="/">
              <MenuItem onClick={logOut}>LogOut</MenuItem>
            </MenuLink>
            <Divider variant="middle" />
            <MenuLink to="/">
              <MenuItem onClick={props.handleClose}>About</MenuItem>
            </MenuLink>
            <MenuLink to="/FAQ">
              <MenuItem
                onClick={props.handleClose}
                selected={pathname === "/FAQ"}
              >
                FAQ
              </MenuItem>
            </MenuLink>
          </div>
        )}
      </Menu>
    </>
  );
};

const AppMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper style={{ padding: "0.75% 2.75%" }}>
      {/* {props.showBackButton == false ? (
        <Picture />
      ) : (
        <BackButton onClick={props.handleBack} />
      )} */}
      <Box className="web-navbar">
        <Link
          to="#"
          style={{ marginRight: 30, color: "black", textDecoration: "none" }}
        >
          Discover
        </Link>
        <Link
          to="/matches"
          style={{ marginRight: 30, color: "black", textDecoration: "none" }}
        >
          Matches
        </Link>

        <Link to="/chat" style={{ color: "black", textDecoration: "none" }}>
          Chat
        </Link>
      </Box>
      <LogoImg />
      <UserIconWrapper>
        <UserIcon onClick={handleMenu} />
      </UserIconWrapper>
      <DropDownMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
        registrationMenu={props.registrationMenu}
      />
    </Wrapper>
  );
};

export default AppMenu;
