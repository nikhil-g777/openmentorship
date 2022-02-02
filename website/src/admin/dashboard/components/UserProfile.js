import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "../../redux/Actions/DashboardActions";

import { Menu1 } from "../Component";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import SessionCard from "../Component/SessionCard/SessionCard";

const useStyles = makeStyles((theme) => ({
  tabsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "7%",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    padding: "16px 27px",
  },
  progressWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "56px!important",
      height: "56px!important",
    },
  },
  profile_container: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    marginTop: "8px",
  },
  sessionWrapper: {
    marginTop: "86px",
    marginBottom: "28px",
  },
  sessionHeading: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "27px",
    letterSpacing: "0em",
    paddingLeft: "24px",
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const dashboardState = useSelector((store) => store.dashboardreducer);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserProfile(id));
    };
    if (
      Object.keys(dashboardState.user)?.length === 0 ||
      id !== dashboardState?.user?.userProfile?._id
    ) {
      fetchUser();
    }
  }, []);

  return (
    <Container>
      <Box className={classes.tabsBox}>
        <Link to={{ pathname: "/admin/dashboard", state: { activeTab: 1 } }}>
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8531 11.84V9.584L2.33313 5.984L10.8531 2.336V0.079999L0.149125 4.88V7.064L10.8531 11.84Z"
              fill="black"
            />
          </svg>
        </Link>
      </Box>
      {dashboardState?.loading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box className={classes.profileSection}>
            <Grid container className={classes.profile_container}>
              <ProfileCard data={dashboardState?.user?.userProfile} />

              <Box className={classes.sessionWrapper}>
                <Typography className={classes.sessionHeading}>
                  Session history
                </Typography>
                <Box className={classes.sessionsSection}>
                  <SessionCard sessions={dashboardState?.user?.sessions} />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default UserProfile;
