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
  padding-top: 50px;
  padding-bottom: 40px;
  padding-left: 200px;
  padding-right: 200px;
  display:flex;
  justify-content:space-between;
  @media (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 40px;
    padding-left: 5px;
    padding-right: 5px;

  }
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
  margin-top:-10px;
`;

const useStyles = makeStyles({
  Links: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "Bold",
    color: "black",
  },
});
export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <Container>
      {/* <ContentWrapper>
        <div className={classes.logo}>
          <MLogo src={Logo} />
        </div>
        <LinksContainer>
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
      {/* </ContentWrapper> */}
      <div className={classes.logo}>
          <MLogo src={Logo} />
        </div>
        <Link to="/about"><a className={classes.Links} href="">
            About
          </a></Link>
          <Link to=""><a className={classes.Links} href="">
           How it Works
          </a></Link>
          <Link to=""> <a className={classes.Links} href="">
           Contact
          </a></Link>
          <Link to=""> <a className={classes.Links} href="">
         Sign In 
          </a></Link>
    </Container>
  );
}
