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
  Divider,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
// additional packages
import chat from "../../images/chat.svg";
import arrow from "../../images/arrow.svg";
import upload from "../../images/upload.svg";
import sendMessage from "../../images/sendMessage.svg";
import { Menu } from "../../components";
import { useHistory } from "react-router-dom";
import "fontsource-roboto";
const useStyles = makeStyles((theme) => ({
  padding: {
    padding: "20px",
    "@media (max-width:780px)": {
      padding: "10px",
    },
  },

  Chat: {
    fontWeight: "normal",
    fontSize: "28px",
    lineHeight: "34px",
    fontStyle: "normal",
  },
  Background: {
    backgroundColor: "#F1F4F4",
  },
  GreenBox: {
    width: "339px",
    height: "76px",
    backgroundColor: "#D8EDE9",
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    "@media (max-width:780px)": {
      width: "300px",
      padding: 15,
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  WhiteBox: {
    width: "339px",
    height: "76px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    "@media (max-width:780px)": {
      width: "300px",
      padding: 15,
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  ArrowImage: {
    width: 12,
    height: 21,
    marginTop: 10,
  },
  MarginImage: {
    marginRight: 15,
  },
  Border: {
    border: "1px solid #000000",
    height: 0,
    width: "339px",
    marginTop: "18%",
    "@media (max-width:780px)": {
      width: "300px",
    },
  },
  RightChat: {
    height: "642px",
    backgroundColor: "white",
  },
  Datee: {
    paddingTop: 20,
    fontWeight: "bold",
    textTransform: "upercase",
    opacity: 0.7,
    fontSize: "16px",
    lineHeight: "27px",
    justifyContent: "center",
    display: "flex",
  },
  GrayBox: {
    backgroundColor: "#F7F7F7",
    width: "419px",
    height: "50px",
    borderRadius: 10,
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 15,
    marginTop: 15,
    "@media (max-width:780px)": {
      width: "auto",
      height: "70px",
    },
  },
  FlexChat: {
    display: "flex",
    padding: 20,
  },
  MarginImage1: {
    marginTop: 15,
    marginRight: 30,
  },
  SenderChatBox: {
    backgroundColor: "#D8EDE9",
    width: "595px",
    height: "73px",
    borderRadius: 10,
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 15,
    marginTop: 15,
    float: "right",
    // display:'flex',
    marginRight: 30,
    marginBottom: "10%",
    "@media (max-width:780px)": {
      width: "auto",
      marginRight: 10,
      height: "88px",
      marginLeft:10

    },
    // justifyContent:'flex-end'
  },
  SendBox: {
    height: "100px",
    border: "1px solid #DEDEDE",
    backgroundColor: "white",
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 25,
    justifyContent: "space-between",
    display: "flex",
    "@media (max-width:780px)": {
      padding: 10,
    },
  },
  Message: {
    width: "52px",
    height: "52px",
  },
  uploadImage: {
    width: "34px",
    height: "34px",
    marginRight: 20,
    marginTop: 10,
  },
  Input: {
    border: "none",
  },
  Navbar: {
    backgroundColor: "white",
    height: "84px",
    padding: 25,
    paddingLeft: "30%",
    paddingRight: "30%",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width:780px)": {
      padding: 25,
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },
  styleFlex:{
      display:'flex'
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
        <Menu
          handleBack={() => history.push("/")}
          registrationMenu={true}
          showBackButton={false}
        />
          <Box className={classes.Navbar}>
            <Typography variant="p" style={{ color: "#51B6A5" }}>
              Chat
            </Typography>
            <Typography variant="p">Questions</Typography>
            <Typography variant="p">Meetings</Typography>
          </Box>
          <Box className={classes.Background}>
            <Grid container spacing={3} className={classes.padding}>
              <Grid item lg={4} sm={12}>
                <Typography variant="h5" className={classes.Chat}>
                  Chat
                </Typography>
                <Box className={classes.GreenBox}>
                  <Typography variant="h6">
                    <img src={chat} className={classes.MarginImage} /> Meghan
                    Raab
                  </Typography>
                  <img src={arrow} className={classes.ArrowImage} />
                </Box>
                <Box className={classes.WhiteBox}>
                  <Typography variant="h6">
                    <img src={chat} className={classes.MarginImage} /> Erin
                    Rapaport
                  </Typography>
                  <img src={arrow} className={classes.ArrowImage} />
                </Box>

                <Box className={classes.Border}></Box>
              </Grid>
              <Grid item lg={8}>
                <Box className={classes.RightChat}>
                  <Typography variant="p" className={classes.Datee}>
                    MONDAY, APRIL 20
                  </Typography>
                  <Box className={classes.FlexChat}>
                    <img src={chat} className={classes.MarginImage1} />
                    <Box className={classes.GrayBox}>
                      Hi! I’m looking forward to working with you!
                    </Box>
                  </Box>

                  <Box className={classes.SenderChatBox}>
                    Hi Meghan! Thanks, I’m excited to get to know you more, and
                    hopefully learn from each other!
                  </Box>
                </Box>

                <Box className={classes.SendBox}>
                  <Box className={classes.styleFlex}>
                    <img src={sendMessage} className={classes.uploadImage} />{" "}
                    <input
                      placeholder=" Type a message"
                      className={classes.Input}
                    />
                  </Box>
                  <img src={upload} className={classes.Message} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
