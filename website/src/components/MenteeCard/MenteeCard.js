import React, { useState } from "react";
import styled from "styled-components";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  NativeSelect,
  Grid,
  Input,
  Typography,
  Container,
} from "@material-ui/core";
import boxImage from "../images/imagebox.png";
import Linkedin from "../images/linkedin.svg";

// additional packages
import "fontsource-roboto";
const useStyles = makeStyles((theme) => ({
  MenteeCard: {
    height: "594px",
    marginTop: "5%",
    marginBottom: "5%",
  },
  padding: {
    padding: "30px",
  },
  MessageButton: {
    backgroundColor: "transparent",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "191px",
    height: "40px",
    textTransform: "lowercase",
  },
  RightGrid: {
    paddingLeft: "40px",
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "27px",
  },
  subHead: {
    color:'#6D6D6D',
    fontSize:'20px',
    lineHeight:'27px',
    fontWeight: "bold",
    paddingLeft: "40px",
    width:"126px",
    opacity:0.8

  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});
export default function MenteeCard(props) {
  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          <Card className={classes.MenteeCard} raised={true}>
            <Grid container spacing={3} className={classes.padding}>
              <Grid item lg={2}>
                <img src={boxImage} />
                <Button className={classes.MessageButton}>
                  {" "}
                  Send a message{" "}
                </Button>
              </Grid>
              <Grid item lg={10}>
                <Typography variant="h5" className={classes.RightGrid}>
                  Meghan Raab <img src={Linkedin} />
                </Typography>
                <Typography variant="p" className={classes.subHead}>
                  Product Marketing Manager at Snap Inc. 5 years of experience in marketing
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}
