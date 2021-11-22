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
    height: "594px",
    marginTop: "5%",
    marginBottom: "5%",
  },
  padding: {
    padding: "30px",
  },
  MessageButton: {
    backgroundColor: "#51B6A5",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "191px",
    height: "40px",
    textTransform: "capitalize",
  },
  RightGrid: {
    paddingLeft: "40px",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "27px",
  },
  Interest: {
    paddingLeft: "40px",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "27px",
    marginTop: 30,
    marginBottom: 5,
  },
  subHead: {
    color: "#6D6D6D",
    fontSize: "18px",
    lineHeight: "27px",
    fontWeight: "bold",
    paddingLeft: "40px",
    width: "370px",
    opacity: 0.8,
    marginTop: 10,
  },
  BodyText: {
    fontSize: "16px",
    lineHeight: "27px",
    paddingLeft: "40px",
    fontWeight: "normal",
    fontFamily: "Roboto",
    marginTop: 20,
    width: "690px",
  },
  InterestDetail: {
    paddingLeft: "40px",
  },
  ButtonBox: {
    // display:'flex',
    paddingLeft: "40px",
    paddingRight: "40px",

  },
  Mock: {
    minWidth: '110px',
    backgroundColor:'#F1F1F1',
    color:'black',
    fontSize:12,
    textTransform: "capitalize",
    height: '30px',
    marginRight:'10px',
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeCard(props) {
  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <Card className={classes.MenteeCard} raised={true}>
            <Grid container spacing={3} className={classes.padding}>
              <Grid item lg={2}>
                <img src={boxImage} />
                <Button className={classes.MessageButton}>Chat</Button>
              </Grid>
              <Grid item lg={10}>
                <Typography variant="h5" className={classes.RightGrid}>
                  Meghan Raab <img src={Linkedin} />
                </Typography>
                <Typography variant="h5" className={classes.subHead}>
                  Product Marketing Manager at Snap Inc. 5 years of experience
                  in marketing
                </Typography>

                <Typography variant="h5" className={classes.BodyText}>
                  I have previously worked with Sephora, LinkedIn, Blue Shield
                  of California, and University of San Francisco. I’m interested
                  in growth marketing, product marketing, content marketing,
                  user acquisition and retention, and customer experience.{" "}
                </Typography>
                <Typography variant="h5" className={classes.Interest}>
                  Areas of interest{" "}
                </Typography>
                <Typography variant="p" className={classes.InterestDetail}>
                  Product marketing, content marketing, media, global tech,
                  project management
                </Typography>

                <Typography variant="h5" className={classes.Interest}>
                  Top skills
                </Typography>
                <Typography variant="p" className={classes.InterestDetail}>
                  User acquisition, digital marketing, product marketing,
                  leadership, marketing analytics
                </Typography>
                <Typography variant="h5" className={classes.Interest}>
                  Open to providing
                </Typography>
                <Box  className={classes.ButtonBox}>
                  <Button className={classes.Mock}>Mock interview</Button>
                  <Button className={classes.Mock}>Project review</Button>
                  <Button className={classes.Mock}>Collaboration on an idea</Button>
                  <Button className={classes.Mock}>Resume review</Button>
                  <Button className={classes.Mock}>Career change advice</Button>
                  <Button className={classes.Mock}>Career advice</Button>
                </Box>

              </Grid>
            </Grid>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}
