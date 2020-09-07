import React, { useState } from 'react'
import styled from 'styled-components'
import LogoNavBar from "../../images/LogoNavBar.png";
import userIcon from "../../images/user.svg";
import backIcon from "../../images/backIcon.svg"

import { Divider, MenuItem, Menu } from '@material-ui/core';
import { Link } from 'react-router-dom'


const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14.69px;
  -webkit-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
`;

const Picture = styled.div`
  width: 32px;
  height: 32px;
`;

const LogoImg = styled(Picture)`
  background-size: cover;
  background-image: url(${LogoNavBar});
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
`

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
`

const MenuLink = styled(Link)`
  color:#000;
  &:hover {
    text-decoration:none;
    color:#000;
}
`

const DropDownMenu = props => {
  const pathname = window.location.pathname
  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.open}
        onClose={props.handleClose}
      >
      {props.registrationMenu ? (
        <>
          <MenuLink to="/">
            <MenuItem onClick={props.handleClose}>About</MenuItem>
          </MenuLink>
          <MenuLink to="FAQ">
            <MenuItem onClick={props.handleClose} selected={pathname === "/FAQ"}>FAQ</MenuItem>
          </MenuLink>
          <MenuLink to="/signin">
            <MenuItem disabled onClick={props.handleClose} selected={pathname === "/signin"}>Sign In</MenuItem>
          </MenuLink>
        </>
        ) : (
          <>
            <MenuLink to="/profile">
              <MenuItem disabled onClick={props.handleClose} selected={pathname === "/profile"}>Profile</MenuItem>
            </MenuLink>
            <MenuLink to="/mentorMatches">
              <MenuItem onClick={props.handleClose} selected={pathname === "/mentorMatches"}>Matches</MenuItem>
            </MenuLink>
            <MenuLink to="/chat">
              <MenuItem disabled onClick={props.handleClose} selected={pathname === "/chat"}>Chat</MenuItem>
            </MenuLink>
            <MenuLink to="/">
              <MenuItem disabled onClick={props.handleClose}>Sign Out</MenuItem>
            </MenuLink>
            <Divider variant="middle" />
            <MenuLink to="/">
              <MenuItem onClick={props.handleClose}>About</MenuItem>
            </MenuLink>
            <MenuLink to="/FAQ">
              <MenuItem onClick={props.handleClose} selected={pathname === "/FAQ"}>FAQ</MenuItem>
            </MenuLink>
          </>
        )}
      </Menu>
    </>
  )
}

const AppMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      {props.showBackButton == false ? (
        <Picture />
      ) : (
        <BackButton onClick={props.handleBack} />
      )}
      <LogoImg />
      <UserIconWrapper>
        <UserIcon onClick={handleMenu}/>
      </UserIconWrapper>
        <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} open={open} registrationMenu={props.registrationMenu}/>
    </Wrapper>
  )
}

export default AppMenu