import React from "react";
import { Link } from "react-router-dom";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";

//imgs
import Logo from "./images/logo_big.png";

const Container = styled.div`
  background-color: #f5f3f8;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 40px;
  // padding-left: 200px;
  // padding-right: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 780px) {
    padding-top: 50px;
    padding-bottom: 40px;
    padding-left: 5px;
    padding-right: 5px;
    display: none;
  }
`;
const MLogo = styled.img`
  width: 45px;
  height: 45px;
  // margin-right: 15px;
  // margin-left: 30px;
  // margin-top: -10px;
`;

const useStyles = makeStyles({
  Links: {
    fontFamily: "proxima_nova",
    fontSize: 16,
    fontWeight:700,
    color: "black",
    "@media (max-width:780px)": {
      marginLeft: 10,
      display: "block",
      fontSize: 13,
      marginBottom: 20,
    },
  },
  MobileFooter: {
    display: "none",
    "@media (max-width:780px)": {
      padding: 10,
      display: "block",
      paddingTop: "50px",
      paddingBottom: "40px",
      paddingLeft: "5px",
      paddingRight: "5px",
      backgroundColor: "#f5f3f8",
      borderRadius: 10,
    },
  },
});
export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <>
      <Container>
        <div className={classes.logo}>
          <MLogo src={Logo} />
        </div>
        {/* <Link to="/about">
          <a className={classes.Links} href="">
            About
          </a>
        </Link> */}
        <Link to="">
          <a style={{fontWeight:'bold',color:'black'}} href="">
            How it Works
          </a>
        </Link>
        
        {/* <Link to="">
          {" "}
          <a className={classes.Links} href="">
            Contact
          </a>
        </Link> */}
        <Link to="">
          {" "}
          <a style={{fontWeight:'bold',color:'black'}} href="">
            You can reach us at : hello@openmentorship.com
          </a>
        </Link>
      </Container>
      <Box className={classes.MobileFooter}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <MLogo src={Logo} />
          </Grid>
          <Grid item xs={3}>
            {/* <Link to="/about">
              <a className={classes.Links} href="">
                About
              </a>
            </Link> */}
            <Link to="">
              <a className={classes.Links} href="">
                How it Works
              </a>
            </Link>
          </Grid>
          <Grid item xs={6}>
            {/* <Link to="">
              {" "}
              <a className={classes.Links} href="">
                Contact
              </a>
            </Link>
            <Link to="">
              {" "}
              <a className={classes.Links} href="">
                Sign In
              </a>
            </Link> */}
                    <Link to="">
          {" "}
          <a className={classes.Links} href="">
            You can reach us at : hello@openmentorship.com
          </a>
        </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
