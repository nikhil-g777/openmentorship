import React, { useState } from "react";
import styled from "styled-components";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  Box,
  Grid,
  Input,
  Typography,
  Container,
} from "@material-ui/core";
import boxImage from "../images/imagebox.png";
import Linkedin from "../images/linkedin.svg";

// additional packages
import "fontsource-roboto";
const useStyles = makeStyles((theme) => ({
  MenteeCard: {
    marginTop: "2%",
    marginBottom: "2%",
    display:'flex',
    padding:10,
    "@media (max-width:780px)": {
      height: "auto",
    },
  },
  BoxImage: {
    display: "block",
    "@media (max-width:780px)": {
      width: "117px",
      height: "120px",
    },
  },
  MobileRightGrid: {
    display: "none",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px",
    paddingLeft: 10,
    "@media (max-width:780px)": {
      display: "block",
    },
  },
  MobileSubHead: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
      color: "#6D6D6D",
      fontSize: "12px",
      lineHeight: "17px",
      fontWeight: "bold",
      paddingLeft: 10,
      width: "auto",
      opacity: 0.8,
      marginTop: 5,
    },
  },
  Profile: {
    width:'116px',
    height:'25px',
    backgroundColor:'#51B6A5',
    borderRadius:4,
    marginTop:8,
    marginLeft: 10,
    fontSize:'11px',
    textTransform: "capitalize",
    fontWeight:'bold'

  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeMobileCard(props) {
  const classes = useStyles();
  const [reconnect, setReconnect] = useState(false);
  const [data, setData] = useState([
    {
      name: "Meghan Raab",
      title:
        "Product Marketing Manager at Snap Inc. 5 years of experience in marketing",
      decription:
        "I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.",
      interest:
        "Product marketing, content marketing, media, global tech, project management",
      skills:
        "User acquisition, digital marketing, product marketing, leadership, marketing analytics",
    },
    {
        name: "Meghan Raab",
        title:
          "Product Marketing Manager at Snap Inc. 5 years of experience in marketing",
        decription:
          "I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.",
        interest:
          "Product marketing, content marketing, media, global tech, project management",
        skills:
          "User acquisition, digital marketing, product marketing, leadership, marketing analytics",
      },
      {
        name: "Meghan Raab",
        title:
          "Product Marketing Manager at Snap Inc. 5 years of experience in marketing",
        decription:
          "I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.",
        interest:
          "Product marketing, content marketing, media, global tech, project management",
        skills:
          "User acquisition, digital marketing, product marketing, leadership, marketing analytics",
      },
      {
        name: "Meghan Raab",
        title:
          "Product Marketing Manager at Snap Inc. 5 years of experience in marketing",
        decription:
          "I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.",
        interest:
          "Product marketing, content marketing, media, global tech, project management",
        skills:
          "User acquisition, digital marketing, product marketing, leadership, marketing analytics",
      },
      {
        name: "Meghan Raab",
        title:
          "Product Marketing Manager at Snap Inc. 5 years of experience in marketing",
        decription:
          "I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.",
        interest:
          "Product marketing, content marketing, media, global tech, project management",
        skills:
          "User acquisition, digital marketing, product marketing, leadership, marketing analytics",
      },
  ]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          {data.map((x) => (
            <Card className={classes.MenteeCard} raised={true}>
                    <img src={boxImage} className={classes.BoxImage} />
                    <Box>
                      <Typography
                        variant="h5"
                        className={classes.MobileRightGrid}
                      >
                        {x.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        className={classes.MobileSubHead}
                      >
                        {x.title}
                      </Typography>
                      <Button className={classes.Profile} onClick={props.viewProfile}>View full profile</Button>
                    </Box>
            </Card>
          ))}
        </Container>
      </ThemeProvider>
    </div>
  );
}
