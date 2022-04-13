import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Box,
  Container,
  CircularProgress,
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "fontsource-roboto";

import MenteeMobileCard from "../../components/MenteeCard/MenteeMobileCard";
import MenteeCard from "../../components/MenteeCard/MenteeCard";
import { Menu } from "../../components";
import Footer from "../../components/Footer";

import {
  getUserMatches,
  updateMatch,
} from "../../redux/Actions/MatchesActions";
import { getUserInfo } from "../../redux/Actions/UserActions";

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    height: "40vh",
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
  tilte: {
    textAlign: "center",
    // paddingTop: "2%",
    paddingTop: "4.1%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "#F1F4F4",
    paddingBottom: "5%",

    "@media (max-width:780px)": {},
  },
  Navbar: {
    backgroundColor: "white",
    height: "60px",
    padding: 20,
    paddingLeft: "30%",
    paddingRight: "30%",
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",

    "@media (max-width:780px)": {
      padding: 25,
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },
  WebCard: {
    display: "block",
    minHeight: 900,
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  MobileCard: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function Matches() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [menteeType, setMenteeType] = useState("active");
  const [mentorType, setMentorType] = useState("active");
  const [snackbar, setSnackbar] = useState(false);
  const [viewType, setViewType] = useState(false);
  const [connectionRequestMessage, setConnectionRequestMessage] = useState("");

  const matches = useSelector((store) => store.matchesreducer.matches);
  const user = useSelector((store) => store.userreducer.user);

  const matchesState = useSelector((store) => store.matchesreducer);

  useEffect(() => {
    async function fetchmatches() {
      await dispatch(getUserMatches());
    }

    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };

    if (user && Object.keys(user).length === 0) {
      fetchUser();
    }

    if (Object.keys(matches).length === 0) {
      fetchmatches();
    }
  }, []);

  const handleType = (mentorValue, menteeValue) => {
    setMentorType(
      user?.user?.userType && user?.user?.userType === "mentor"
        ? mentorValue
        : ""
    );
    setMenteeType(menteeValue);
  };
  const viewProfile = () => {
    setViewType(true);
  };

  const handleChangeRequestMessage = (e) => {
    setConnectionRequestMessage(e.target.value);
  };

  const handleUpdateConnectionRequest = async (matchId, updatestatus) => {
    let payload = {
      matchId: matchId,
      status: updatestatus,
      requestMessage: connectionRequestMessage,
    };
    console.log("payload: ", payload);
    await dispatch(updateMatch(payload));
    handleOpenSnackbar();
  };

  const handleOpenSnackbar = () => {
    setSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={matchesState?.matchError ? "error" : "success"}
        >
          {matchesState?.matchError
            ? "Error updating status"
            : "Status updated succesfully!"}
        </Alert>
      </Snackbar>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
      <ThemeProvider theme={theme}>
        {/* <div
          style={{
            backgroundColor: "white",
          }}
        >
          <Container></Container>
        </div> */}
        <div
          style={{ backgroundColor: "white", borderTop: "1px solid lightgrey" }}
        >
          <Container>
            <Box className={classes.Navbar}>
              <Typography
                variant="p"
                style={{ color: menteeType === "active" ? "#51B6A5" : "" }}
                onClick={() => handleType("active", "active")}
              >
                Active
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: menteeType === "MentorPending" ? "#51B6A5" : "",
                }}
                onClick={() => handleType("MentorPending", "pending")}
              >
                Pending
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: menteeType === "MentorClosed" ? "#51B6A5" : "",
                }}
                onClick={() => handleType("MentorClosed", "closed")}
              >
                Closed
              </Typography>
            </Box>
          </Container>
        </div>

        <Box className={classes.Background}>
          {matchesState?.loading ? (
            <Box className={classes.progressWrapper}>
              <CircularProgress />
            </Box>
          ) : (
            <Container>
              <Typography variant="h6" className={classes.tilte}>
                {menteeType === "active"
                  ? "Your active connections"
                  : menteeType === "pending"
                  ? "Your pending connections"
                  : "Your past connections"}
              </Typography>
              <Box
                className={classes.MobileCard}
                style={{ display: viewType ? "none" : "", minHeight: 800 }}
              >
                <MenteeMobileCard
                  viewProfile={viewProfile}
                  menteeType={menteeType}
                  mentorType={mentorType}
                  matchData={matches}
                  handleUpdateConnectionRequest={handleUpdateConnectionRequest}
                  handleChangeRequestMessage={handleChangeRequestMessage}
                  connectionRequestMessage={connectionRequestMessage}
                  userType={
                    user?.user?.userType === "mentee"
                      ? "mentor"
                      : user?.user?.userType === "mentor"
                      ? "mentee"
                      : ""
                  }
                />
              </Box>
              <Box style={{ display: viewType ? "" : "none", minHeight: 900 }}>
                <MenteeCard
                  menteeType={menteeType}
                  mentorType={mentorType}
                  matchData={matches}
                  handleUpdateConnectionRequest={handleUpdateConnectionRequest}
                  handleChangeRequestMessage={handleChangeRequestMessage}
                  connectionRequestMessage={connectionRequestMessage}
                  userType={
                    user?.user?.userType === "mentee"
                      ? "mentor"
                      : user?.user?.userType === "mentor"
                      ? "mentee"
                      : ""
                  }
                />
              </Box>
              <Box className={classes.WebCard}>
                <MenteeCard
                  menteeType={menteeType}
                  mentorType={mentorType}
                  matchData={matches}
                  handleUpdateConnectionRequest={handleUpdateConnectionRequest}
                  handleChangeRequestMessage={handleChangeRequestMessage}
                  connectionRequestMessage={connectionRequestMessage}
                  userType={
                    user?.user?.userType === "mentee"
                      ? "mentor"
                      : user?.user?.userType === "mentor"
                      ? "mentee"
                      : ""
                  }
                />
              </Box>
            </Container>
          )}
        </Box>
      </ThemeProvider>
      <div
        style={{
          backgroundColor: "#f5f3f8",
        }}
      >
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}
