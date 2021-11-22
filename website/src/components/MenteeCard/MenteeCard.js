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
    minHeight: "594px",
    marginTop: "5%",
    marginBottom: "5%",
    "@media (max-width:780px)": {
      height: "auto",
    },
  },
  padding: {
    padding: "30px",
    "@media (max-width:780px)": {
      padding: "10px",
    },
  },
  MessageButton: {
    backgroundColor: "#51B6A5",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "191px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  MessageButton1: {
    backgroundColor: "#51B6A5",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "141px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  CancelButton:{
    backgroundColor: "transpernt",
    border: "none",
    borderRadius: 50,
    marginTop: 20,
    width: "141px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  Decline: {
    backgroundColor: "transpernt",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "191px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  RightGrid: {
    paddingLeft: "60px",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "27px",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
    },
  },
  Interest: {
    paddingLeft: "60px",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "27px",
    marginTop: 30,
    marginBottom: 5,
    "@media (max-width:780px)": {
      paddingLeft: "0px",
    },
  },
  subHead: {
    color: "#6D6D6D",
    fontSize: "18px",
    lineHeight: "27px",
    fontWeight: "bold",
    paddingLeft: "60px",
    width: "400px",
    opacity: 0.8,
    marginTop: 10,
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      width: "250px",
    },
  },
  BodyText: {
    fontSize: "16px",
    lineHeight: "27px",
    paddingLeft: "60px",
    fontWeight: "normal",
    fontFamily: "Roboto",
    marginTop: 20,
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      width: "auto",
    },
  },
  InterestDetail: {
    paddingLeft: "60px",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
    },
  },
  ButtonBox: {
    // display:'flex',
    paddingLeft: "60px",
    paddingRight: "60px",
    width: "600px",
    lineHeight: 2.5,
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
      width: "300px",
    },
  },
  Mock: {
    minWidth: "110px",
    backgroundColor: "#F1F1F1",
    color: "black",
    fontSize: 12,
    textTransform: "capitalize",
    height: "30px",
    marginRight: "10px",
  },
  Reconnevt: {
    backgroundColor: "#EFEFEF",
    borderRadius: "4px",
    padding: 30,
    height: "500px",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
  },
  Meghan: {
    fontSize: 22,
    lineHeight: "27px",
    fontWeight: "bold",
    marginBottom:10
  },
  mentor: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
  },
  MessageArea : {
    height:312,
    backgroundColor:'white',
    padding:30,
    marginTop:30
  },
  MessageInput : {
    border:'none'
  },
  buttonFlex: {
    display:'flex',
    justifyContent:'flex-end'
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeCard(props) {
  const classes = useStyles();
  const [reconnect, setReconnect] = useState(false);

  const handleReconnect = () => {
    setReconnect(true);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <Card className={classes.MenteeCard} raised={true}>
            <Grid container spacing={3} className={classes.padding}>
              <Grid item lg={2}>
                <img src={boxImage} />
                {props.menteeType === "Active" ? (
                  <Button className={classes.MessageButton}>Chat</Button>
                ) : props.menteeType === "Pending" ? (
                  <Button className={classes.Decline}>Withdraw request</Button>
                ) : (
                  <>
                    <Button className={classes.Decline}>Archived chat</Button>
                    <Button
                      className={classes.MessageButton}
                      onClick={handleReconnect}
                    >
                      Reconnect
                    </Button>
                  </>
                )}
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
                <Box className={classes.ButtonBox}>
                  <Button className={classes.Mock}>Mock interview</Button>
                  <Button className={classes.Mock}>Project review</Button>
                  <Button className={classes.Mock}>
                    Collaboration on an idea
                  </Button>
                  <Button className={classes.Mock}>Resume review</Button>
                  <Button className={classes.Mock}>Career change advice</Button>
                  <Button className={classes.Mock}>Career advice</Button>
                </Box>
              </Grid>
                {reconnect ?
              <Box className={classes.Reconnevt}>
                <Typography variant="h5" className={classes.Meghan}>
                  Send a request to Meghan Raab
                </Typography>
                <Typography variant="h6" className={classes.mentor}>
                  Let Meghan Rabb know why you want them as your mentor.{" "}
                </Typography>
                <Box className={classes.MessageArea}>
                  <input placeholder="Type message here..." className={classes.MessageInput}/>
                  </Box>
                  <Box className={classes.buttonFlex}>
                    <Button  className={classes.CancelButton} onClick= {() => setReconnect(false)}>Cancel</Button>
                    <Button  className={classes.MessageButton1}>Send</Button>

                    </Box>
              </Box>
              :null}
            </Grid>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}
