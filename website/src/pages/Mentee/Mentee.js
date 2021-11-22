import React, { useState } from "react";
import styled from "styled-components";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
Container,
Grid,
Typography
} from "@material-ui/core";
import "fontsource-roboto";
import MenteeCard  from "../../components/MenteeCard/MenteeCard";

const useStyles = makeStyles((theme) => ({

  tilte: {
    textAlign:'center',
    marginTop:'10%',
    fontSize:'28px'

  },
  subtilte: {
    textAlign:'center',
    marginTop:'2%',
    fontSize:'16px',
    lineHeight:'27px',
    justifyContent:'center',
    alignItems:'center',
    paddingRight:'20%',
    paddingLeft:'20%'
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Mentee(props) {
  const classes = useStyles();
  const [userType, setUserType] = useState("");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
        <Typography variant="h6" className={classes.tilte}>Here’s your curated list of potential mentors!</Typography>
        <Typography variant="h6" className={classes.subtilte}>Send message requests to the mentors that you would like to work with until the deadline on April 29. They will receive your request and let you know if they want to work with you. Good luck!</Typography>
        <MenteeCard/>
        </Container>
      </ThemeProvider>
    </div>
  );
}
