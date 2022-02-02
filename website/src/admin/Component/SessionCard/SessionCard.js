import React, { useState } from "react";

// mui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, TextField, Typography } from "@material-ui/core";

import boxImage from "../../../components/images/imagebox.png";
import Linkedin from "../../../components/images/linkedin.svg";
// additional packages
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  tabsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.8%",
    boxShadow: "4px 8px 8px rgb(201 199 199 / 25%)",
    padding: "21px 26px 8px",
  },
  sessionsText: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0em",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
  },
  searchText: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0em",
    marginRight: "14px",
  },
  search: {
    border: "1px solid #AEAEAE",
    margin: 0,
    "& .MuiInputBase-root": {
      borderRadius: 0,
    },
    "& input": {
      padding: "2px 6px",
      height: "21px",
    },
  },

  sessionCard: {
    marginTop: "10px",
    padding: "3px 26px 62px",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },

  padding: {
    padding: "30px",
    "@media (max-width:780px)": {
      padding: "10px",
    },
  },
  RightGrid: {
    paddingLeft: "70px",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "27px",
    display: "block",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
    },
  },
  subHead: {
    color: "#6D6D6D",
    fontSize: "18px",
    lineHeight: "27px",
    fontWeight: "bold",
    paddingLeft: "70px",
    maxWidth: "400px",
    opacity: 0.8,
    marginTop: 10,
    display: "block",
    "@media (max-width:780px)": {
      paddingLeft: "0px",
      width: "250px",
    },
  },
  BoxImage: {
    display: "block",

    "@media (max-width:780px)": {
      width: "117px",
      height: "120px",
    },
  },
  linkedinLogo: {
    marginLeft: "13px",
  },
  FlexImageBox: {
    display: "block",
    "@media (max-width:780px)": {
      display: "flex",
    },
  },
  NumberFlex: {
    display: "flex",
    // justifyContent: "space-between",
    // width: 340,
    // marginLeft: 30,
    "@media (max-width:780px)": {
      display: "block",
      width: "auto",
      marginLeft: 30,
      justifyContent: "center",
    },
  },
  MatchText: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "27px",
    letterSpacing: "0em",
  },
  SessionText: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "27px",
    letterSpacing: "0em",
    marginLeft: "23px",
  },
  BorderText: {
    marginLeft: "12px",
  },
}));

export default function SessionCard(props) {
  const classes = useStyles();

  return (
    <Container>
      {props.isSessionsPage ? (
        <Box className={classes.tabsBox}>
          <Box>
            <Typography className={classes.sessionsText}>
              {props.sessionType} Sessions
            </Typography>
          </Box>
          <Box className={classes.searchBox}>
            <Typography className={classes.searchText}>Search</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="userID/Name"
              className={classes.search}
            />
          </Box>
        </Box>
      ) : (
        ""
      )}

      {props.sessions?.map((x) => (
        <Box className={classes.sessionCard} key={x?._id}>
          <Grid container spacing={8} className={classes.padding}>
            <Grid item xs={12}>
              <Box className={classes.NumberFlex}>
                <Typography className={classes.MatchText}>
                  Match date:
                  <span className={classes.BorderText}>
                    {new Date(x?.match?.createdAt).toLocaleDateString()}
                  </span>
                </Typography>
                <Typography className={classes.SessionText}>
                  Session ID:
                  <span className={classes.BorderText}>
                    {x?.match?.latestSession}
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box className={classes.FlexImageBox}>
                <img src={boxImage} className={classes.BoxImage} />
              </Box>
            </Grid>
            <Grid item lg={10}>
              <Typography variant="h5" className={classes.RightGrid}>
                {`${x?.match?.mentor?.firstName} ${x?.match?.mentor?.lastName}`}
                <img src={Linkedin} className={classes.linkedinLogo} />
              </Typography>
              <Box className={classes.descriptionSection}>
                <Typography variant="h5" className={classes.subHead}>
                  {x?.match?.mentor?.headline}
                </Typography>
                <Typography variant="h5" className={classes.subHead}>
                  {x?.match?.mentor?.bio}
                </Typography>
              </Box>
            </Grid>

            <Grid item lg={2}>
              <Box className={classes.FlexImageBox}>
                <img src={boxImage} className={classes.BoxImage} />
              </Box>
            </Grid>
            <Grid item lg={10}>
              <Typography variant="h5" className={classes.RightGrid}>
                {`${x?.match?.mentee?.firstName} ${x?.match?.mentee?.lastName}`}
                <img src={Linkedin} className={classes.linkedinLogo} />
              </Typography>
              <Box className={classes.descriptionSection}>
                <Typography variant="h5" className={classes.subHead}>
                  {x?.match?.mentee?.headline}
                </Typography>
                <Typography variant="h5" className={classes.subHead}>
                  {x?.match?.mentee?.bio}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Container>
  );
}
