import React, { useState } from "react";
import styled from "styled-components";
import { Menu } from "../../components";
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tilte: {
    textAlign: "center",
    paddingTop: "2%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "#F1F4F4",
    paddingBottom:'5%',

    "@media (max-width:780px)": {
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

export default function Mentor(props) {
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

    <div>

      <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Container>
          <Menu
            handleBack={() => history.push("/")}
            registrationMenu={true}
            showBackButton={false}
          />
        </Container> 
      </div>
        <div style={{backgroundColor:'white',   borderTop:'1px solid lightgrey',}}>
          <Container >
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
            style={{ color: menteeType === "MentorPending" ? "#51B6A5" : "" }}
            onClick={() => handleType("MentorPending")}
          >
            Pending
          </Typography>
          <Typography
            variant="p"
            style={{ color: menteeType === "MentorClosed" ? "#51B6A5" : "" }}
            onClick={() => handleType("MentorClosed")}
          >
            Closed
          </Typography>
          </Box>
          </Container>
          </div>
        
        <Box className={classes.Background}>
          <Container>

          <Typography variant="h6" className={classes.tilte}>
            {menteeType === "Active"
              ? "Your active connections"
              : menteeType === "MentorPending"
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
    </Container>

        </Box>
      </ThemeProvider>
      <div style={{backgroundColor:'#f5f3f8'}}>
        <Container>
      <Footer/>

        </Container>
      </div>

    </div>

  );
}
