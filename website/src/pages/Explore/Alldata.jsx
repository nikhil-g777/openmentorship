import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import "fontsource-roboto";
import "../../style/Explore.css";
import { GoAlert } from "react-icons/go";

//components

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Footer from "../../components/Footer";

//redux actions
import { createMatch } from "../../redux/Actions/MatchesActions";
import { getUserInfo } from "../../redux/Actions/UserActions";


const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    // height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "56px!important",
      height: "56px!important",
    },
    "& > div > svg": {
      color: "#51b6a5",
    },
  },
  profileWrapper: {
    backgroundColor: "#F1F4F4",
    paddingBottom: 50,
    paddingTop: 80,
    minHeight: "93vh",
  },
  // profile_container: {
  //   backgroundColor: "#F1F4F4",
  //   boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  //   padding: "42px 38px 37px 30px ",
  // },
  notFoundSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12%",
    color: "#161313",
    "& svg": {
      fontSize: "22px",
    },
  },
  notFoundText: {
    fontSize: "22px",
    fontWeight: "600",
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
}));

export default function Alldata(props) {
  const { data, loading } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const userState = useSelector((store) => store.userreducer);
  const [reconnect, setReconnect] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [message, setMessage] = useState("");

  const { user } = userState;
  console.log(user, "userid");
    useEffect(() => {
      const fetchUser = async () => {
        await dispatch(getUserInfo());
      };
      if (user && Object.keys(userState?.user?.user || {}).length === 0) {
        fetchUser();
      }
    }, []);
  const handleRequest = async () => {
    const data = {
      match: {
        menteeId: user.user._id,
        mentorId: selectedData._id,
        requestMessage: message,
      },
    };
    const response = await dispatch(createMatch(data));
    if (response?.payload?.data?.success) {
      alert("success");
      setMessage("");
      setReconnect(false);
    }
    else {
      alert("Failed");

    }
  };
  return (
    <>
      {loading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data?.length === 0 ? (
            <Box className={classes.profileWrapper}>
              <Container>
                <Grid
                  container
                  justify="space-around"
                  className={classes.profile_container}
                >
                  <Grid item xs={12}>
                    <Box className={classes.notFoundSection}>
                      <GoAlert /> &nbsp;
                      <Typography className={classes.notFoundText}>
                        Result not found
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          ) : (
            <Box className={classes.profileWrapper}>
              <Container>
                <Container>
                  <Grid lg={12}>
                    <Typography
                      className="color_pro"
                      style={{ fontSize: "28px" }}
                    >
                      All results
                    </Typography>
                  </Grid>
                  <Grid container className={classes.profile_container}>
                    {data?.map((elm) => (
                      <Grid container className="m-top">
                        <ProfileCard
                          data={elm}
                          isRequest={true}
                          setSelectedData={setSelectedData}
                          setReconnect={setReconnect}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {reconnect ? (
                    <Box className={classes.Reconnevt}>
                      <Typography variant="h5" className={classes.Meghan}>
                        Send a request to {selectedData?.firstName}
                      </Typography>
                      <Typography variant="h6" className={classes.mentor}>
                        Let {selectedData?.firstName} know why you want them as
                        your mentor.{" "}
                      </Typography>
                      {/* <Box className={classes.MessageArea}> */}
                      <textarea
                        rows={10}
                        placeholder="Type message here..."
                        className={classes.MessageInput}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
                          onClick={handleRequest}
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  ) : null}
                </Container>
              </Container>
            </Box>
          )}
        </>
      )}
    </>
  );
}
