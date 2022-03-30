import React, { useEffect, useState,useRef } from "react";

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

const useStyles = makeStyles((theme) => ({
  navWrapper: {
    marginBottom: "12px",
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
    marginTop: 5,
    float: "right",
    // display:'flex',
    marginRight: 30,
    marginBottom: "2%",
    "@media (max-width:780px)": {
      width: "auto",
      marginRight: 10,
      height: "88px",
      marginLeft: 10,
    },
    // justifyContent:'flex-end'
  },
  SendBox: {
    height: "100px",
    width: "40%",
    border: "1px solid #DEDEDE",
    backgroundColor: "white",
    boxShadow: "0px 5px 13px rgba(0, 0, 0, 0.1)",
    padding: 25,
    justifyContent: "space-between",
    display: "flex",
    bottom: 10,

    "@media (max-width:780px)": {
      padding: 10,
    },
    position: "absolute",
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

  const [messages, setMessages] = useState([]);

  const getToken = async () => {
    // Paste your unique Chat token function
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
    if (selectedSID) {
      handleSelected(selectedSID);
    }
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
  const handleSelected = (sid) => {
    setSelectedSID(sid);
    const selectedConversation = conversations.get(sid);

    setSelectedcon(selectedConversation);
    handleChat(selectedConversation,sid);

  };
  const handleChat = (selectedConversation,id) => {
    selectedConversation
      .getMessages()
      .then((messagePaginator) => {
        setLoading(false);
        setMessages(messagePaginator.items);
      })
      .catch((err) => {
        console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
      });

  };

  const sendMessagee = (event) => {
    event.preventDefault();
    setLoading(true);
    const message = typeMessage;
    setTypeMessage("");
    selectedcon.sendMessage(message);
    getToken();
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      sendMessagee(event);
    }
  };

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
                <Grid item lg={4} sm={12}>
                  <Typography variant="h5" className={classes.Chat}>
                    Chat
                  </Typography>
                  {matches?.matches?.active?.length > 0 ? (
                    <>
                      {matches?.matches?.active?.map((x, index) => (
                        <Box
                          className={x.latestSession.twilioConversationSid===selectedSID? classes.GreenBox:classes.WhiteBox}
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
                  <Grid item lg={8}>
                    <Box style={{ maxHeight: 600, overflow: "scroll" }} >
                      {messages.map((x) =>
                        x.author === user?.user?._id ? (
                          <Box className={classes.SenderChatBox}>{x.body}</Box>
                          
                        ) : (

                          <Box className={classes.GrayBox}>{x.body}</Box>
                        )
                      )}
                    </Box>
                    {selectedSID?
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
                    :null}
                  </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <div style={{ backgroundColor: "#f5f3f8" }}>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}
