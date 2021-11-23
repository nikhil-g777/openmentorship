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
    "@media (max-width:780px)": {
      width: "101px",
      height: "29px",
    },
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
    "@media (max-width:780px)": {
      width: "101px",
      height: "29px",
    },
  },
  CancelButton: {
    backgroundColor: "transpernt",
    border: "none",
    borderRadius: 50,
    marginTop: 20,
    width: "141px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
    "@media (max-width:780px)": {
      width: "101px",
      height: "29px",
    },
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
    "@media (max-width:780px)": {
      width: "131px",
      height: "29px",
    },
  },
  RightGrid: {
    paddingLeft: "60px",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "27px",
    display: "block",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      display: "none",
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
    display: "block",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      width: "250px",
      display: "none",
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
    height: "auto",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
  },
  Meghan: {
    fontSize: 22,
    lineHeight: "27px",
    fontWeight: "bold",
    marginBottom: 10,
  },
  mentor: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
  },
  MessageArea: {
    height: 312,
    backgroundColor: "white",
    padding: 30,
    marginTop: 30,
  },
  MessageInput: {
    border: "none",
  },
  buttonFlex: {
    display: "flex",
    justifyContent: "flex-end",
  },
  BoxImage: {
    display: "block",
    "@media (max-width:780px)": {
      width: "117px",
      height: "120px",
    },
  },
  FlexImageBox: {
    display: "block",
    "@media (max-width:780px)": {
      display: "flex",
    },
  },
  MobileRightGrid: {
    display: "none",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "27px",
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
      marginTop: 10,
    },
  },
  Connections: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
      width: 29,
      height: 29,
      marginTop: 20,
      marginRight: 7,
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeCard(props) {
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
  ]);
  const Mock = [
    "Mock interview",
    "Project review",
    "Collaboration on an idea",
    "Resume review",
    "Career change advice",
    "Career advice",
  ];

  const handleReconnect = () => {
    setReconnect(true);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          {data.map((x) => (
            <Card className={classes.MenteeCard} raised={true}>
              <Grid container spacing={3} className={classes.padding}>
                <Grid item lg={2}>
                  <Box className={classes.FlexImageBox}>
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
                    </Box>
                  </Box>
                  {props.menteeType === "Active" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button className={classes.MessageButton}> Chat</Button>
                    </Box>
                  ) : props.menteeType === "Pending" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button className={classes.Decline}>
                        Withdraw request
                      </Button>
                    </Box>
                  ) : props.menteeType === "MentorPending" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button className={classes.MessageButton}>
                        Approve request
                      </Button>
                      <Button className={classes.Decline}>
                        Decline request
                      </Button>
                    </Box>
                  ) : props.menteeType === "MentorClosed" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button className={classes.Decline}>Archived chat</Button>
                    </Box>
                  ) : (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />{" "}
                      <Button className={classes.Decline}>Archived chat</Button>
                      <Button
                        className={classes.MessageButton}
                        onClick={handleReconnect}
                      >
                        Reconnect
                      </Button>
                    </Box>
                  )}
                </Grid>
                <Grid item lg={10}>
                  <Typography variant="h5" className={classes.RightGrid}>
                    {x.name} <img src={Linkedin} />
                  </Typography>
                  <Typography variant="h5" className={classes.subHead}>
                    {x.title}
                  </Typography>

                  <Typography variant="h5" className={classes.BodyText}>
                    {x.decription}
                  </Typography>
                  <Typography variant="h5" className={classes.Interest}>
                    Areas of interest{" "}
                  </Typography>
                  <Typography variant="p" className={classes.InterestDetail}>
                    {x.interest}
                  </Typography>

                  <Typography variant="h5" className={classes.Interest}>
                    Top skills
                  </Typography>
                  <Typography variant="p" className={classes.InterestDetail}>
                    {x.skills}
                  </Typography>
                  <Typography variant="h5" className={classes.Interest}>
                    Open to providing
                  </Typography>
                  <Box className={classes.ButtonBox}>
                    {Mock.map((x) => (
                      <Button className={classes.Mock}>{x}</Button>
                    ))}
                  </Box>
                </Grid>
                {reconnect ? (
                  <Box className={classes.Reconnevt}>
                    <Typography variant="h5" className={classes.Meghan}>
                      Send a request to {x.name}
                    </Typography>
                    <Typography variant="h6" className={classes.mentor}>
                      Let {x.name} know why you want them as your mentor.{" "}
                    </Typography>
                    <Box className={classes.MessageArea}>
                      <input
                        placeholder="Type message here..."
                        className={classes.MessageInput}
                      />
                    </Box>
                    <Box className={classes.buttonFlex}>
                      <Button
                        className={classes.CancelButton}
                        onClick={() => setReconnect(false)}
                      >
                        Cancel
                      </Button>
                      <Button className={classes.MessageButton1}>Send</Button>
                    </Box>
                  </Box>
                ) : null}
              </Grid>
            </Card>
          ))}
        </Container>
      </ThemeProvider>
    </div>
  );
}
