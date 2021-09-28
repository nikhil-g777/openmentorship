import React from "react";
import { Link } from "react-router-dom";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

//imgs
import Logo from "./images/logo_big.png";

const Container = styled.div`
  background-color: #f5f3f8;
  width: 100%;
  padding-top: 39px;
  padding-bottom: 39px;
`;

const ContentWrapper = styled.div`
  width: 275px;
  display: flex;
  margin: 0 auto;
`;

const LinksContainer = styled.div`
  width: 191px;
  height: 62px;
  display: flex;
  flex-direction: column;
`;

const MLogo = styled.img`
  width: 45px;
  height: 43px;
  margin-right: 15px;
  margin-left: 30px;
`;

const useStyles = makeStyles({
  Links: {
    fontFamily: "proxima_nova",
    fontSize: 16,
    fontWeight: "Bold",
    color: "#000000",
  },
});
export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <Container>
      <ContentWrapper>
        <div className={classes.logo}>
          {/* <Link to="/register"> */}
          <MLogo src={Logo} />
          {/* </Link> */}
        </div>
        <p className={classes.Links}>Contact Us : hello@openmentorship.com</p>
        {/* <LinksContainer>
          <a className={classes.Links} href="">
            <Link to="/about">About</Link>
          </a>

          <a className={classes.Links} href="">
            <Link to="">How it Works</Link>
          </a>
        </LinksContainer>
        <LinksContainer>
          <a className={classes.Links} href="">
            <Link to="">Contact</Link>
          </a>

          <a className={classes.Links} href="">
            <Link to="">Sign In </Link>
          </a>
        </LinksContainer> */}
      </ContentWrapper>
    </Container>
  );
}
