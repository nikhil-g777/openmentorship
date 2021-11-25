import React, { useState } from "react";
import styled from "styled-components";
import { Menu } from "../../components";
import { useHistory } from "react-router-dom";
import './index.css'
import Footer from "../../components/Footer";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
import "fontsource-roboto";
import MenteeCard from "../../components/MenteeCard/MenteeCard";
import MenteeMobileCard from "../../components/MenteeCard/MenteeMobileCard";
const useStyles = makeStyles((theme) => ({
  tilte: {
    textAlign: "center",
    paddingTop: "2%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "#F1F4F4",
    paddingBottom:'5%',

    // padding: 40,
    // paddingLeft: 120,
    // paddingRight: 120,
    "@media (max-width:780px)": {
      // padding: 10,
      // paddingLeft: 10,
      // paddingRight: 10,
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
    borderTop:'1px solid lightgrey',

    "@media (max-width:780px)": {
      padding: 25,
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },
  WebCard: {
    display:'block',
    
    "@media (max-width:780px)": {
      display:'none',
    },
  },
  MobileCard: {
    display:'none',
    "@media (max-width:780px)": {
      display:'block',
    },
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Mentee(props) {
  const classes = useStyles();
  const history = useHistory();

  const [menteeType, setMenteeType] = useState("Active");
  const [viewType, setViewType] = useState(false);

  const handleType = (value) => {
    setMenteeType(value);
  };
  const viewProfile = () => {
    setViewType(true)
  }
  return (
    <Container>

    <div>
      <ThemeProvider theme={theme}>
      <Menu
          handleBack={() => history.push("/")}
          registrationMenu={true}
          showBackButton={false}
        />
        <Box className={classes.Navbar}>
          <Typography
            variant="p"
            style={{ color: menteeType === "Active" ? "#51B6A5" : "" }}
            onClick={() => handleType("Active")}
          >
            Active
          </Typography>
          <Typography
            variant="p"
            style={{ color: menteeType === "Pending" ? "#51B6A5" : "" }}
            onClick={() => handleType("Pending")}
          >
            Pending
          </Typography>
          <Typography
            variant="p"
            style={{ color: menteeType === "Closed" ? "#51B6A5" : "" }}
            onClick={() => handleType("Closed")}
          >
            Closed
          </Typography>
        </Box>
        <Box className={classes.Background}>
          <Typography variant="h6" className={classes.tilte}>
            {menteeType === "Active"
              ? "Your active connections"
              : menteeType === "Pending"
              ? "Your pending connections"
              : "Your past connections"}
          </Typography>
          <Box className={classes.MobileCard} style={{display:viewType? 'none':''}}>
            <MenteeMobileCard
           viewProfile={viewProfile} />
            </Box>
            <Box style={{display:viewType? '':'none'}}>
            <MenteeCard 
          menteeType={menteeType}/>
          </Box >
            <Box className={classes.WebCard}>
          <MenteeCard 
          menteeType={menteeType}/>
            </Box>

        </Box>
      </ThemeProvider>
      <Footer/>
    </div>
    </Container>

  );
}
