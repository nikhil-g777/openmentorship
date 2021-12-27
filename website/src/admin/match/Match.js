import React, { useState } from "react";
import styled from "styled-components";
import { Menu1 } from "../Component";
import { MdOutlineArrowDropDown } from "react-icons/md";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Container, Box, Typography, Button } from "@material-ui/core";
import "fontsource-roboto";
import { useHistory } from "react-router-dom";
import Profile from "../Component/ProfileComponent/Profile";
import MenteeCard from "../Component/MenteeCard/MenteeCard";

const useStyles = makeStyles((theme) => ({
  tilte: {
    textAlign: "center",
    paddingTop: "2%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "white",
    paddingBottom: "5%",
    paddingLeft: "18%",
    paddingRight: "18%",
    "@media (max-width:780px)": {
      paddingLeft: "0%",
      paddingRight: "0%",
    },
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
  FlexDashboard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    minHeight: 65,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 15,
  },
  FilterButton: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
  },
  Dashboard: {
    width: "100%",
    minHeight: 555,
    background: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
  Input: {
    width: 300,
    textAlign: "end",
    "@media (max-width:780px)": {
      width: "auto",
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Match(props) {
  const classes = useStyles();
  const history = useHistory();

  const [sessionType, setSessionType] = useState("Current");
  const [viewType, setViewType] = useState(false);

  const handleType = (value) => {
    setSessionType(value);
  };
  const viewProfile = () => {
    setViewType(true);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          <Container>
            <Menu1
              handleBack={() => history.push("/")}
              registrationMenu={true}
              showBackButton={false}
            />
          </Container>
        </div>
        <div
          style={{ backgroundColor: "white", borderTop: "1px solid lightgrey" }}
        >
          <Container>
            <Box className={classes.Navbar}>
              <Typography
                variant="p"
                style={{ color: sessionType === "Current" ? "#51B6A5" : "" }}
                onClick={() => handleType("Current")}
              >
                Current
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: sessionType === "Profile" ? "#51B6A5" : "",
                }}
                onClick={() => handleType("Profile")}
              >
                Profile
              </Typography>
            </Box>
          </Container>
        </div>

        <Box className={classes.Background}>
          <Container>
            <Box className={classes.Dashboard}>
              <Box className={classes.FlexDashboard}>
                <Typography className={classes.title}>
                  {sessionType === "Current" ? "Mentors" : ""}
                </Typography>
                {sessionType === "Profile" ? (
                  <Typography className={classes.title}>
                    Search{" "}
                    <span>
                      <input
                        placeholder="User ID/ Name"
                        className={classes.Input}
                      />
                    </span>
                  </Typography>
                ) : null}
              </Box>
              {/* <Box className={classes.WebCard}> */}
              {sessionType === "Current" ? <MenteeCard /> : <Profile />}
              {/* </Box> */}
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      {/* <div style={{backgroundColor:'#f5f3f8'}}>
        <Container>
      <Footer/>

        </Container>
      </div> */}
    </div>
  );
}
