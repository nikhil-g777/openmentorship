import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import "fontsource-roboto";
import { GoAlert } from "react-icons/go";

//components
import { Menu } from "../../components";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Footer from "../../components/Footer";

//redux actions
import { getUserInfo } from "../../redux/Actions/UserActions";

const useStyles = makeStyles((theme) => ({
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
  profileWrapper: {
    backgroundColor: "#F1F4F4",
    paddingBottom: 50,
    paddingTop: 80,
    minHeight: "93vh",
  },
  profile_container: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    padding: "42px 38px 37px 30px ",
  },
  notFoundSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12%",
    color: "#161313",
    "& svg": {
      fontSize: "22px",
    },
  },
  notFoundText: {
    fontSize: "22px",
    fontWeight: "600",
  },
}));

export default function Mentee() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userState = useSelector((store) => store.userreducer);

  const { user } = userState;

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };
    if (user && Object.keys(userState?.user?.user || {}).length === 0) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <Box
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <Container>
          <Menu registrationMenu={true} showBackButton={false} />
        </Container>
      </Box>
      {userState?.loading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!user?.user ? (
            <Box className={classes.profileWrapper}>
              <Container>
                <Grid
                  container
                  justify="space-around"
                  className={classes.profile_container}
                >
                  <Grid item xs={12}>
                    <Box className={classes.notFoundSection}>
                      <GoAlert /> &nbsp;
                      <Typography className={classes.notFoundText}>
                        User not found
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          ) : (
            <Box className={classes.profileWrapper}>
              <Container>
                <Container>
                  <Grid container className={classes.profile_container}>
                    <ProfileCard data={user?.user} isProfilePage={true} />
                  </Grid>
                </Container>
              </Container>
            </Box>
          )}
        </>
      )}
      <Box style={{ backgroundColor: "#f5f3f8" }}>
        <Container>
          <Footer />
        </Container>
      </Box>
    </>
  );
}
