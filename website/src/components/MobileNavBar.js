import React, {useState} from "react";
import styled from "styled-components";
import LogoNavBar from "./images/logo.png";
import userIcon from "./images/userIcon.png";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
  background-color:#ffffff;
`;

const Picture = styled.div`
  width: 32px;
  height: 32px;
`;

const LogoImg = styled(Picture)`
  background-size: cover;
  background-image: url(${LogoNavBar});
`;

const UserIcon = styled(Picture)`
  background-size: cover;
  background-image: url(${userIcon});
`;

const MobileNavBar = () => {

  const [mainPage, setMainPage] = useState(null)
  return (
    <Wrapper>
      { mainPage ? (<ArrowBackIosIcon/>) :  <Picture/> } 
      <LogoImg />
      <UserIcon />
    </Wrapper>
  );
};

export default MobileNavBar;
