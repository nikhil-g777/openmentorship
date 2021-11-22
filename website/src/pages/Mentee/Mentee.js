import React, { useState } from "react";
import styled from "styled-components";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
import "fontsource-roboto";
import MenteeCard from "../../components/MenteeCard/MenteeCard";

const useStyles = makeStyles((theme) => ({
  tilte: {
    textAlign: "center",
    paddingTop: "2%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "#F1F4F4",
    padding: 40,
    paddingLeft: 120,
    paddingRight: 120,
    "@media (max-width:780px)": {
      padding: 10,
      paddingLeft: 10,
      paddingRight: 10,
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
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Mentee(props) {
  const classes = useStyles();
  const [menteeType, setMenteeType] = useState("Active");
  const handleType = (value) => {
    setMenteeType(value);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
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
        <Container className={classes.Background}>
          <Typography variant="h6" className={classes.tilte}>
            {menteeType === "Active"
              ? "Your active connections"
              : menteeType === "Pending"
              ? "Your pending connections"
              : "Your past connections"}
          </Typography>
          <MenteeCard 
          menteeType={menteeType}/>
        </Container>
      </ThemeProvider>
    </div>
  );
}
