import React, { useState } from "react";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Card, Button, Box, Typography, Container } from "@material-ui/core";

import boxImage from "../images/imagebox.png";
// additional packages
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  MenteeCard: {
    marginTop: "2%",
    marginBottom: "2%",
    display: "flex",
    padding: 10,
    "@media (max-width:780px)": {
      height: "auto",
    },
  },
  BoxImage: {
    display: "block",
    "@media (max-width:780px)": {
      width: "117px",
      height: "120px",
    },
  },
  MobileRightGrid: {
    display: "none",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px",
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
      marginTop: 5,
    },
  },
  Profile: {
    width: "116px",
    height: "25px",
    backgroundColor: "#51B6A5",
    borderRadius: 4,
    marginTop: 8,
    marginLeft: 10,
    fontSize: "11px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function MenteeMobileCard(props) {
  // console.log("mentee mobile props: ", props);
  const classes = useStyles();
  const [reconnect, setReconnect] = useState(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
          {props.matchData[props.menteeType]?.map((x) => (
            <Card key={x._id} className={classes.MenteeCard} raised={true}>
              <img
                src={
                  x[props.userType]?.profileImageUrls?.default
                    ? x[props.userType].profileImageUrls.default
                    : boxImage
                }
                className={classes.BoxImage}
              />
              <Box>
                <Typography variant="h5" className={classes.MobileRightGrid}>
                  {`${x[props.userType]?.firstName}  ${
                    x[props.userType]?.lastName
                  }`}
                </Typography>
                <Typography variant="h5" className={classes.MobileSubHead}>
                  {x[props.userType]?.headline}
                </Typography>
                <Button className={classes.Profile} onClick={props.viewProfile}>
                  View full profile
                </Button>
              </Box>
            </Card>
          ))}
        </Container>
      </ThemeProvider>
    </div>
  );
}
