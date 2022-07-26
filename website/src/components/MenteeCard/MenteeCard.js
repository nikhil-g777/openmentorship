import React, { useState } from "react";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  Chip,
} from "@material-ui/core";

import boxImage from "../images/imagebox.png";
import Linkedin from "../images/linkedin.svg";
import { useHistory } from "react-router-dom";

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
      width: "auto",
      minWidth: "102px",
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
      width: "auto",
      minWidth: "102px",
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
      width: "auto",
      height: "29px",
      minWidth: "102px",
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
      width: "auto",
      height: "29px",
      minWidth: "102px",
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
  MeganMessage: {
    backgroundColor: "#EFEFEF",
    padding: "20px",
    borderRadius: "4px",
  },
  meghanTitle: {
    marginBottom: "10px",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageBack: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "20px",
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
    width: "100%",
    padding: 20,
    marginTop: 20,
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
  buttonsBox: {
    display: "flex",
    flexDirection: "column",
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
  // console.log("props: ", props);
  const classes = useStyles();
  const history = useHistory();
  const [reconnect, setReconnect] = useState(false);

  const handleReconnect = () => {
    setReconnect(true);
    window.scrollTo(0, document.body.scrollHeight);
    // document.getElementById('scroll').scrollTop =  document.getElementById('scroll').scrollHeight
    // const scrollingElement = document.scrollingElement || document.body;
    // scrollingElement.scrollTop = scrollingElement.scrollHeight;
  };
  const handleNavigate = (id) => {
    console.log(id, " id here");
    history.push(`/chat?${id}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {Object.keys(props.matchData).length > 0 &&
          props.matchData[props.menteeType]?.map((x) => (
            <Card key={x._id} className={classes.MenteeCard} raised={true}>
              <Grid container spacing={3} className={classes.padding}>
                <Grid item lg={2}>
                  <Box className={classes.FlexImageBox}>
                    <img
                      src={
                        x[props.userType]?.profileImageUrls?.default
                          ? x[props.userType].profileImageUrls.default
                          : boxImage
                      }
                      className={classes.BoxImage}
                    />
                    <Box>
                      <Typography
                        variant="h5"
                        className={classes.MobileRightGrid}
                      >
                        {`${x[props.userType]?.firstName}  ${
                          x[props.userType]?.lastName
                        }`}
                      </Typography>
                      <Typography
                        variant="h5"
                        className={classes.MobileSubHead}
                      >
                        {x[props.userType]?.headline}
                      </Typography>
                    </Box>
                  </Box>
                  {props.menteeType === "active" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button
                        className={classes.MessageButton}
                        onClick={() =>
                          handleNavigate(
                            x?.latestSession?.twilioConversationSid
                          )
                        }
                      >
                        {" "}
                        Chat
                      </Button>
                      {props.userType === "mentee" ? (
                        <Button
                          className={classes.Decline}
                          onClick={() => {
                            props.setOpen(true);
                            props.setMatchId(x?._id);
                          }}
                        >
                          End Session
                        </Button>
                      ) : null}
                    </Box>
                  ) : props.menteeType === "pending" &&
                    props.mentorType !== "MentorPending" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Button
                        className={classes.Decline}
                        onClick={() =>
                          props.handleUpdateConnectionRequest(x?._id, "closed")
                        }
                      >
                        Withdraw request
                      </Button>
                    </Box>
                  ) : props.mentorType === "MentorPending" ? (
                    <Box className={classes.FlexImageBox}>
                      <img src={Linkedin} className={classes.Connections} />
                      <Box className={classes.buttonsBox}>
                        <Button
                          className={classes.MessageButton}
                          onClick={() =>
                            props.handleUpdateConnectionRequest(
                              x?._id,
                              "active"
                            )
                          }
                        >
                          Approve request
                        </Button>
                        <Button
                          className={classes.Decline}
                          onClick={() =>
                            props.handleUpdateConnectionRequest(
                              x?._id,
                              "closed"
                            )
                          }
                        >
                          Decline request
                        </Button>
                      </Box>
                    </Box>
                  ) : props.mentorType === "MentorClosed" ? (
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
                    {`${x[props.userType]?.firstName} ${
                      x[props.userType]?.lastName
                    }`}{" "}
                    <img src={Linkedin} />
                  </Typography>
                  <Typography variant="h5" className={classes.subHead}>
                    {x[props.userType]?.headline}
                  </Typography>

                  <Typography variant="h5" className={classes.BodyText}>
                    {x[props.userType]?.bio}
                  </Typography>
                  <Typography variant="h5" className={classes.Interest}>
                    Areas of interest{" "}
                  </Typography>
                  <Typography variant="p" className={classes.InterestDetail}>
                    {x[props.userType]?.interests.map((interest, i) => (
                      // <span key={i}>{interest},&nbsp;</span>
                      <Chip
                        label={interest}
                        style={{ marginRight: 10, marginTop: 20 }}
                      />
                    ))}
                  </Typography>

                  <Typography variant="h5" className={classes.Interest}>
                    Top skills
                  </Typography>
                  <Typography variant="p" className={classes.InterestDetail}>
                    {x[props.userType]?.skills.map((skill, i) => (
                      <Chip
                        label={skill}
                        style={{ marginRight: 10, marginTop: 20 }}
                      />
                    ))}
                  </Typography>
                  <Typography variant="h5" className={classes.Interest}>
                    Open to providing
                  </Typography>
                  <Box className={classes.ButtonBox}>
                    {Object.keys(x[props.userType]?.goals || {}).length > 0 &&
                      Object.entries(x[props.userType]?.goals || {}).map(
                        ([key, value]) =>
                          value && (
                            <Button key={key} className={classes.Mock}>
                              {key}
                            </Button>
                          )
                      )}
                  </Box>
                  <Typography variant="h5" className={classes.Interest}>
                    Communication preference
                  </Typography>
                  <Box className={classes.ButtonBox}>
                    {x[props.userType]?.communicationPreferences.map((x) => (
                      <Button className={classes.Mock}>{x}</Button>
                    ))}
                  </Box>
                  <Typography variant="h5" className={classes.Interest}>
                    Preferred communication frequency
                  </Typography>
                  <Box className={classes.ButtonBox}>
                    <Button className={classes.Mock}>
                      {x[props.userType]?.communicationFrequency}
                    </Button>
                  </Box>
                </Grid>
                <Grid item lg={12}>
                  {props.menteeType === "pending" &&
                  props.mentorType !== "MentorPending" ? (
                    <Box className={classes.MeganMessage}>
                      <Typography variant="h5" className={classes.meghanTitle}>
                        Note from Meghan:
                      </Typography>
                      <Box className={classes.messageBack}>
                      <Typography variant="h6" className={classes.mentor}>{x?.requestMessage}</Typography>
                      </Box>
                    </Box>
                  ) : null}
                </Grid>
                {reconnect ? (
                  <Box className={classes.Reconnevt}>
                    <Typography variant="h5" className={classes.Meghan}>
                      Send a request to {x[props.userType]?.firstName}
                    </Typography>
                    <Typography variant="h6" className={classes.mentor}>
                      Let {x[props.userType]?.firstName} know why you want them
                      as your mentor.{" "}
                    </Typography>
                    {/* <Box className={classes.MessageArea}> */}
                    <textarea
                      rows={10}
                      placeholder="Type message here..."
                      className={classes.MessageInput}
                      value={props.connectionRequestMessage}
                      onChange={props.handleChangeRequestMessage}
                    />
                    {/* </Box> */}
                    <Box className={classes.buttonFlex}>
                      <Button
                        className={classes.CancelButton}
                        onClick={() => setReconnect(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className={classes.MessageButton1}
                        onClick={() =>
                          props.handleUpdateConnectionRequest(x?._id, "active")
                        }
                      >
                        Send
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Grid>
            </Card>
          ))}
        <Box id="scroll"></Box>
      </Container>
    </ThemeProvider>
  );
}
