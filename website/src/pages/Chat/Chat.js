import React, { useEffect, useState, useRef } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Client as ConversationsClient } from "@twilio/conversations";
// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import "fontsource-roboto";

import { Menu } from "../../components";
import Footer from "../../components/Footer";
import chat from "../../images/chat.svg";
import arrow from "../../images/arrow.svg";
import upload from "../../images/upload.svg";
import sendMessage from "../../images/sendMessage.svg";
import { getUserMatches } from "../../redux/Actions/MatchesActions";
import { getUserInfo, userChatToken } from "../../redux/Actions/UserActions";
import { MdArrowBackIosNew } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  navWrapper: {
    marginBottom: "12px",
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  padding: {
    padding: "20px",
    "@media (max-width:780px)": {
      padding: "10px",
    },
  },
  chatWrapper: {
    backgroundColor: "#F1F4F4",
    paddingBottom: 30,
    minHeight: "93vh",
  },
  Chat: {
    fontWeight: "normal",
    fontSize: "28px",
    lineHeight: "34px",
    fontStyle: "normal",
    marginBottom: "30px",
  },
  Background: {
    backgroundColor: "#F1F4F4",
  },
  GreenBox: {
    width: "339px",
    height: "76px",
    backgroundColor: "#D8EDE9",
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    cursor: "pointer",
    "@media (max-width:780px)": {
      width: "340px",
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
    cursor: "pointer",
    "@media (max-width:780px)": {
      width: "340px",
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
    width: "595px",
    minHeight: "73px",
    borderRadius: 10,
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 15,
    marginTop: 5,
    marginBottom: "2%",
    marginRight: 30,
    float: "left",

    "@media (max-width:780px)": {
      width: "100%",
      minHeight: "70px",
    },
  },
  SenderChatBox: {
    backgroundColor: "#D8EDE9",
    width: "595px",
    minHeight: "73px",
    borderRadius: 10,
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 15,
    marginTop: 5,
    float: "right",
    // display:'flex',
    marginRight: 30,
    marginBottom: "2%",
    "@media (max-width:780px)": {
      width: "100%",
      minHeight: "70px",
      float: "left",
    },
    // justifyContent:'flex-end'
  },
  FlexChat: {
    display: "flex",
    padding: 20,
  },
  MarginImage1: {
    marginTop: 15,
    marginRight: 30,
  },
  SendBox: {
    height: "100px",
    width: "53%",
    border: "1px solid #DEDEDE",
    backgroundColor: "white",
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 25,
    justifyContent: "space-between",
    display: "flex",
    bottom: 10,

    "@media (max-width:780px)": {
      padding: 10,
      width: "87%",
      bottom: 0,
      position: "fixed",
    },
    position: "absolute",
  },
  Message: {
    width: "52px",
    height: "52px",
  },
  TimeDate: {
    color: "#747474",
    display: "block",
    fontSize: 12,
  },
  uploadImage: {
    width: "34px",
    height: "34px",
    marginRight: 20,
    marginTop: 10,
  },
  Input: {
    border: "none",
    width: "100%",
    outline: "none",
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
  styleFlex: {
    display: "flex",
    width: "100%",
  },
  responsive: {
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  responsive1: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
    },
  },
  foter: {
    backgroundColor: "#f5f3f8",
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function MenteeCard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [twilloId, setTwilloId] = useState("");
  const [conversations, setConversation] = useState();
  const [typeMessage, setTypeMessage] = useState("");
  const [selectedcon, setSelectedcon] = useState("");
  const [selectedSID, setSelectedSID] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoding] = useState(true);
  const [isShow, setIsShow] = useState(true);

  const [messages, setMessages] = useState([]);

  const getToken = async () => {
    const data = await dispatch(userChatToken());
    initConversations(data.data.twilioToken);
  };

  const initConversations = async (myToken) => {
    window.conversationsClient = ConversationsClient;
    const conversationsClient = await ConversationsClient.create(myToken);
    console.log(
      "Connect to twillo",
      conversationsClient?.conversations?.conversations
    );
    setConversation(conversationsClient?.conversations?.conversations);
    // if(conversations){
    console.log(selectedSID, "selectedSID");
    const select = window.location.href.split("?");
    console.log(select, "select");
    if (select.length > 1 && selectedSID === "") {
      console.log(select[1], "select");

      firstSelected(
        select[1],
        conversationsClient?.conversations?.conversations
      );
    } else {
      setMessageLoding(false);
    }

    if (selectedSID) {
      handleSelected(
        selectedSID,
        conversationsClient?.conversations?.conversations
      );
    }

    // }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };
    if (user && Object.keys(userState?.user?.user || {}).length === 0) {
      fetchUser();
    }
    dispatch(getUserMatches());
    getToken();
  }, []);
  const matches = useSelector((store) => store.matchesreducer);
  const userState = useSelector((store) => store.userreducer);
  const { user } = userState;

  console.log(twilloId, "twilloId");
  const firstSelected = (sid, convers) => {
    console.log(sid, "fdfd");
    setIsShow(false);
    // if (windowDimensions.width > 700) {
    //   setIsSmall(false);
    // }
    // console.log(conversations,"conversations")
    const selectedConversation = convers.get(sid);
    setSelectedcon(selectedConversation);
    handleChat(selectedConversation, sid);
    setSelectedSID(sid);
  };
  const handleSelected = (sid, convers) => {
    console.log(sid, "fdfd");
    console.log(conversations, "conversations");
    setSelectedSID(sid);
    const selectedConversation = conversations.get(sid);
    setSelectedcon(selectedConversation);
    handleChat(selectedConversation, sid);
  };
  const handleChat = (selectedConversation, id) => {
    try {
      selectedConversation.getMessages().then((messagePaginator) => {
        setLoading(false);
        setMessages(messagePaginator.items);
      });
      setMessageLoding(false);
      // .catch((err) => {

      // });
    } catch {
      alert("Request Failed By Fetching Messages");
      setMessageLoding(false);
    }
  };

  const sendMessagee = (event) => {
    if (typeMessage.length > 800) {
      alert("Message length should be less than 800 characters");
    } else {
      event.preventDefault();
      setLoading(true);
      const message = typeMessage;
      setTypeMessage("");
      selectedcon.sendMessage(message);
      getToken();
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      sendMessagee(event);
    }
  };
  console.log(messages, "messages");
  return (
    <>
      <Box className={classes.navWrapper}>
        <Container>
          <Menu
            handleBack={() => history.push("/")}
            registrationMenu={true}
            showBackButton={false}
          />
        </Container>
      </Box>
      <ThemeProvider theme={theme}>
        <Box className={classes.chatWrapper}>
          <Container>
            <Box className={classes.Background}>
              <Grid container spacing={3} className={classes.padding}>
                <Grid item lg={4} sm={12} className={classes.responsive}>
                  <Typography variant="h5" className={classes.Chat}>
                    Chat
                  </Typography>
                  {matches?.matches?.active?.length > 0 ? (
                    <>
                      {matches?.matches?.active?.map((x, index) => (
                        <Box
                          className={
                            x.latestSession.twilioConversationSid ===
                            selectedSID
                              ? classes.GreenBox
                              : classes.WhiteBox
                          }
                          key={index}
                          onClick={() =>
                            handleSelected(
                              x.latestSession.twilioConversationSid
                            )
                          }
                        >
                          <Typography variant="h6">
                            <img src={chat} className={classes.MarginImage} />
                            {user?.user?.userType === "mentee"
                              ? x?.mentor?.firstName
                              : x?.mentee?.firstName}
                          </Typography>
                          <img src={arrow} className={classes.ArrowImage} />
                        </Box>
                      ))}
                    </>
                  ) : (
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      No Active User
                    </Typography>
                  )}
                </Grid>
                {isShow ? (
                  <Grid item lg={4} sm={12} className={classes.responsive1}>
                    <Typography variant="h5" className={classes.Chat}>
                      Chat
                    </Typography>
                    {matches?.matches?.active?.length > 0 ? (
                      <>
                        {matches?.matches?.active?.map((x, index) => (
                          <Box
                            className={
                              x.latestSession.twilioConversationSid ===
                              selectedSID
                                ? classes.GreenBox
                                : classes.WhiteBox
                            }
                            key={index}
                            onClick={() => {
                              handleSelected(
                                x.latestSession.twilioConversationSid
                              );
                              setIsShow(false);
                            }}
                          >
                            <Typography variant="h6">
                              <img src={chat} className={classes.MarginImage} />
                              {user?.user?.userType === "mentee"
                                ? x?.mentor?.firstName
                                : x?.mentee?.firstName}
                            </Typography>
                            <img src={arrow} className={classes.ArrowImage} />
                          </Box>
                        ))}
                      </>
                    ) : (
                      <Typography variant="h6" style={{ textAlign: "center" }}>
                        No Active User
                      </Typography>
                    )}
                  </Grid>
                ) : (
                  <Grid item lg={8} className={classes.responsive1}>
                    {messageLoading ? (
                      <CircularProgress
                        size={42}
                        color="inherit"
                        style={{ marginLeft: "40%", marginTop: "10%" }}
                      />
                    ) : (
                      <>
                        <Box
                          style={{
                            display: "flex",
                            padding: 10,
                            marginBottom: "5%",
                          }}
                        >
                          <MdArrowBackIosNew onClick={() => setIsShow(true)} />
                          <Typography style={{ marginLeft: "40%" }}>
                            Name
                          </Typography>
                        </Box>
                        <Box style={{ maxHeight: 500, overflow: "scroll" }}>
                          {messages.map((x) =>
                            x.author === user?.user?._id ? (
                              <Box className={classes.SenderChatBox}>
                                {x.body}
                                {/* <br/><span className={classes.TimeDate}>
                              {x.state.timestamp.toLocaleString()}
                            </span> */}
                              </Box>
                            ) : (
                              <Box className={classes.GrayBox}>
                                {x.body}
                                {/* <br/><span className={classes.TimeDate}>
                              {x.state.timestamp.toLocaleString()}
                            </span> */}
                              </Box>
                            )
                          )}
                        </Box>
                      </>
                    )}
                    {selectedSID ? (
                      <Box className={classes.SendBox}>
                        <Box className={classes.styleFlex}>
                          <img
                            src={sendMessage}
                            className={classes.uploadImage}
                          />{" "}
                          <textarea
                            placeholder=" Type a message"
                            className={classes.Input}
                            value={typeMessage}
                            onChange={(e) => setTypeMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                          />
                        </Box>
                        {loading ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          <img
                            src={upload}
                            className={classes.Message}
                            onClick={sendMessagee}
                          />
                        )}
                      </Box>
                    ) : null}
                  </Grid>
                )}
                <Grid item lg={8} className={classes.responsive}>
                  {messageLoading ? (
                    <CircularProgress
                      size={42}
                      color="inherit"
                      style={{ marginLeft: "40%", marginTop: "10%" }}
                    />
                  ) : (
                    <Box style={{ maxHeight: 500, overflow: "scroll" }}>
                      {messages.map((x) =>
                        x.author === user?.user?._id ? (
                          <Box className={classes.SenderChatBox}>{x.body}</Box>
                        ) : (
                          <Box className={classes.GrayBox}>{x.body}</Box>
                        )
                      )}
                    </Box>
                  )}
                  {selectedSID ? (
                    <Box className={classes.SendBox}>
                      <Box className={classes.styleFlex}>
                        <img
                          src={sendMessage}
                          className={classes.uploadImage}
                        />{" "}
                        <input
                          placeholder=" Type a message"
                          className={classes.Input}
                          value={typeMessage}
                          onChange={(e) => setTypeMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                      </Box>
                      {loading ? (
                        <CircularProgress size={22} color="inherit" />
                      ) : (
                        <img
                          src={upload}
                          className={classes.Message}
                          onClick={sendMessagee}
                        />
                      )}
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <div className={classes.foter}>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}
