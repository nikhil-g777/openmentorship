import React from "react";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//imgs
import Logo from "./images/logo_big.png";

const Container = styled.div`
  background-color: #f5f3f8;
  width: 100%;
  padding-top: 39px;
  padding-bottom: 39px;
`;

const ContentWrapper = styled.div`
  width: 375px;
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
  margin-right: 55px;
  margin-left: 30px;
`;

const useStyles = makeStyles({
  Links: {
    fontFamily: "Proxima Nova",
    fontStyle: "Semibold",
    fontSize: 16,
    color: "#000000",
    marginBottom: 24,
  },
});
export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <Container>
      <ContentWrapper>
        <div className={classes.logo}>
          <MLogo src={Logo} />
        </div>

        <LinksContainer>
          <a className={classes.Links} href="">
            About
          </a>
          <a className={classes.Links} href="">
            How it Works
          </a>
        </LinksContainer>
        <LinksContainer>
          <a className={classes.Links} href="">
            Contact
          </a>
          <a className={classes.Links} href="">
            Sign In
          </a>
        </LinksContainer>
      </ContentWrapper>
    </Container>
  );
}
