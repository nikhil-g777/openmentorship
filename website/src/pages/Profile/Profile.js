import React, { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

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
import Footer from "../../components/Footer";

//images
import twitterIcon from "../../images/image 23.png";
import mediumIcon from "../../images/image 24.png";
import githubIcon from "../../images/github-logo.png";
import behanceIcon from "../../images/behance-logo.png";
import portfolioIcon from "../../images/portfolio-icon.png";
import otherIcon from "../../images/other-icon.png";
import linked from "../../images/image 16.png";
import editIcon from "../../images/edit 1.png";

//redux actions
import { getUserInfo } from "../../redux/Actions/UserActions";

import "./index.css";

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
  profile_container: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    marginTop: "80px",
    padding: "30px",
  },
  profile_img: {
    borderRadius: "5px",
    width: "191px",
    height: "191px",
    [theme.breakpoints.down("sm")]: {
      width: "117px",
      height: "120px",
    },
  },
  pro_typo1: {
    // fontFamily: 'Proxima Nova',
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "27px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  pro_typo2: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    linHeight: "27px",
    color: "#6D6D6D",
    marginTop: "10px",
  },
  pro_typo3: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px",
    marginTop: "25px",
  },
  pro_typo4: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "27px",
    marginTop: "10px",
  },
  pro_typo_btn: {
    backgroundColor: "#F1F1F1",
    borderRadius: "4px",
    // width: '140px',
    // height: '30px',
    textAlign: "center",
    padding: "8px",
    fontSize: "13px",
    textTransform: "capitalize",
    // [theme.breakpoints.down('sm')]: {
    //   width: '130px'
    // }
  },
  social_div: {
    marginTop: "15px",
  },
  pro_typo_div: {
    display: "flex",
    alignItems: "center",
  },
  pro_typo_div_main: {
    display: "flex",
    justifyContent: "space-between",
  },
  edit_txt: {
    color: "#51B6A5 ",
    textDecoration: "underline",
    fontSize: "16px",
    marginLeft: "10%",
  },
  pro_typo_div2: {
    display: "flex",
    alignItems: "center",
  },
  pro_typo1_sm: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "27px",
      display: "block",
      marginLeft: "4%",
    },
  },
  img_div_xs: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
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
  /* or 135% */
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Mentee(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const userState = useSelector((store) => store.userreducer);
  // const user = undefined;

  console.log("userState: ", userState);
  const user = userState?.user?.user;
  console.log("user: ", user);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };
    if (user && Object.keys(user).length === 0) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <Box
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
      </Box>
      {userState?.loading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <Box style={{ backgroundColor: "#F1F4F4", paddingBottom: 50 }}>
          <Container>
            <ThemeProvider theme={theme}>
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Grid
                  container
                  xs={12}
                  md={10}
                  lg={10}
                  justify="space-around"
                  className={classes.profile_container}
                >
                  {!user ? (
                    <Box className={classes.notFoundSection}>
                      <GoAlert /> &nbsp;
                      <Typography className={classes.notFoundText}>
                        User not found
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={2}
                        lg={2}
                        style={{ marginTop: "10px" }}
                      >
                        <Box component="div" className={classes.img_div_xs}>
                          <img
                            className={classes.profile_img}
                            src="https://wallpaperaccess.com/full/2969091.jpg"
                          />
                          <Typography className={classes.pro_typo1_sm}>
                            {/* Emily Lee */}
                            {`${user?.firstName} ${user?.lastName}`}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={7}
                        md={7}
                        style={{ marginTop: "10px" }}
                      >
                        <Box
                          component="div"
                          className={classes.pro_typo_div_main}
                        >
                          <Box component="div" className={classes.pro_typo_div}>
                            <Typography className={classes.pro_typo1}>
                              {/* Emily Lee */}
                              {`${user?.firstName} ${user?.lastName}`}
                            </Typography>
                            <img src={linked} style={{ marginLeft: 10 }} />
                          </Box>
                          <Link to="/edit-profile">
                            <Box
                              component="div"
                              className={classes.pro_typo_div2}
                            >
                              <img src={editIcon} width="23px" height="23px" />
                              <Typography className={classes.edit_txt}>
                                Edit
                              </Typography>
                            </Box>
                          </Link>
                        </Box>
                        <Typography className={classes.pro_typo2}>
                          {/* Marketing Intern at Propeller Health<br></br>Cognitive
                    Science at UCLA 2022 */}
                          {user?.headline}
                        </Typography>
                        <Typography className={classes.pro_typo3}>
                          About
                        </Typography>
                        <Typography className={classes.pro_typo4}>
                          {/* I am a second-year UCLA Regents Scholar interested in
                    digital health, healthcare management, population health
                    studies, and social innovation. I am experienced in email
                    marketing techniques, SEO and brand analytics. */}
                          {user?.bio}
                        </Typography>
                        <Typography className={classes.pro_typo3}>
                          Areas of interest
                        </Typography>
                        <Typography className={classes.pro_typo4}>
                          {/* Public health, social innovation, digital health, healthcare
                    management */}
                          {user?.interests?.map((interest, i) => (
                            <span key={i}>{interest},</span>
                          ))}
                        </Typography>
                        <Typography className={classes.pro_typo3}>
                          Top skills
                        </Typography>
                        <Typography className={classes.pro_typo4}>
                          {user?.skills?.map((skill, i) => (
                            <span key={i}>{skill},</span>
                          ))}
                          {/* Marketing techniques, SEO, brand analytics, email marketing */}
                        </Typography>
                        <Typography className={classes.pro_typo3}>
                          Looking for
                        </Typography>
                        <Grid
                          item
                          container
                          spacing={1}
                          style={{ marginTop: "10px" }}
                        >
                          {Object.keys(user || {}).length > 0 &&
                            Object.entries(user?.goals).map(([key, value]) => (
                              <Grid item key={key}>
                                {value && (
                                  <Typography className={classes.pro_typo_btn}>
                                    {key}
                                  </Typography>
                                )}
                              </Grid>
                            ))}
                        </Grid>
                        <Typography className={classes.pro_typo3}>
                          Social Media
                        </Typography>
                        <Box component="div" className={classes.social_div}>
                          {Object.keys(user || {}).length > 0 &&
                            Object.entries(user?.socialLinks || {}).map(
                              ([key, value]) => (
                                <a href={value} target="_blank" key={key}>
                                  {value && (
                                    <img
                                      src={
                                        `${key}` === "Twitter"
                                          ? twitterIcon
                                          : key === "Medium"
                                          ? mediumIcon
                                          : key === "Behance"
                                          ? behanceIcon
                                          : key === "Github"
                                          ? githubIcon
                                          : key === "Portfolio"
                                          ? portfolioIcon
                                          : key === "Other"
                                          ? otherIcon
                                          : ""
                                      }
                                      className="logo-icons"
                                    />
                                  )}
                                </a>
                              )
                            )}
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Container>
            </ThemeProvider>
          </Container>
        </Box>
      )}
      <Box style={{ backgroundColor: "#f5f3f8" }}>
        <Container>
          <Footer />
        </Container>
      </Box>
    </>
  );
}
