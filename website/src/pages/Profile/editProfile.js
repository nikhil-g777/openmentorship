import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactChipInput from "react-chip-input";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { Container, CircularProgress, Typography } from "@material-ui/core";
import { CheckBoxOutlineBlank, StopRounded } from "@material-ui/icons";
import "fontsource-roboto";

import linked from "../../images/image 16.png";
import editIcon from "../../images/edit 1.png";

import { Menu } from "../../components";
import Footer from "../../components/Footer";

import { getUserInfo, updateUser } from "../../redux/Actions/UserActions";

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
    "& > div > svg": {
      color: "#51b6a5",
    },
  },
  profileWrapper: {
    backgroundColor: "#F1F4F4",
    paddingBottom: 50,
    minHeight: "93vh",
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
    [theme.breakpoints.down("xs")]: {
      width: "160px",
      height: "150px",
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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
    width: "100%",
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
    cursor: "pointer",
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
  feild_info: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginLeft: "4%",
      marginTop: "5px",
      width: "400px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
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

  const [about, setAbout] = useState("");
  const [interest, setInterest] = useState([]);
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const userState = useSelector((store) => store.userreducer);

  const user = userState?.user?.user;

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };
    if ((user && Object.keys(user).length === 0) || !user) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setAbout(user?.headline);
      setInterest(user?.interests);
      setSkills(user?.skills);
      setGoals(user?.goals);
      setSocialLinks(user?.socialLinks);
    }
  }, [user]);

  const handleChangeGoals = (event) => {
    const { name, checked } = event.target;
    setGoals({ ...goals, [name]: checked });
  };

  const addSkill = (value) => {
    const newskills = skills.slice();
    newskills.push(value);
    setSkills(newskills);
  };

  const removeSkill = (index) => {
    const newskills = skills.slice();
    newskills.splice(index, 1);
    setSkills(newskills);
  };

  const addInterests = (value) => {
    const newinterests = interest.slice();
    newinterests.push(value);
    setInterest(newinterests);
  };

  const removeInterests = (index) => {
    const newinterests = interest.slice();
    newinterests.splice(index, 1);
    setInterest(newinterests);
  };

  const handleChangeSocialLinks = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSocialLinks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    let userData = {
      bio: about,
      interests: interest,
      skills: skills,
      goals: goals,
      socialLinks: socialLinks,
    };
    await dispatch(
      updateUser({
        type: "updateUser",
        user: userData,
      })
    );
    history.push("/profile");
  };

  return (
    <>
      <Container>
        <Menu
          handleBack={() => history.push("/")}
          registrationMenu={true}
          showBackButton={false}
        />
      </Container>
      {userState?.loading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <Box className={classes.profileWrapper}>
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
                <Grid item xs={12} md={2} lg={2} style={{ marginTop: "10px" }}>
                  <Box component="div" className={classes.img_div_xs}>
                    <img
                      className={classes.profile_img}
                      src="https://wallpaperaccess.com/full/2969091.jpg"
                    />
                    <Box component="div">
                      <Typography className={classes.pro_typo1_sm}>
                        {user ? `${user?.firstName} ${user?.lastName}` : `N/A`}
                      </Typography>
                      <TextField
                        className={classes.feild_info}
                        variant="outlined"
                        value="Marketing Intern at Propeller"
                        fullWidth
                      />
                      <TextField
                        className={classes.feild_info}
                        variant="outlined"
                        value="0 years of experience"
                        fullWidth
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={7} md={7} style={{ marginTop: "10px" }}>
                  <Box component="div" className={classes.pro_typo_div_main}>
                    <Box component="div" className={classes.pro_typo_div}>
                      <Typography className={classes.pro_typo1}>
                        {user ? `${user?.firstName} ${user?.lastName}` : `N/A`}
                      </Typography>

                      <img src={linked} style={{ marginLeft: "3%" }} />
                    </Box>
                    <Box
                      component="div"
                      className={classes.pro_typo_div2}
                      onClick={handleUpdateUser}
                    >
                      <img src={editIcon} width="23px" height="23px" />
                      <Typography className={classes.edit_txt}>Save</Typography>
                    </Box>
                  </Box>
                  <Typography className={classes.pro_typo2}>
                    {user?.headline}
                  </Typography>
                  <Typography className={classes.pro_typo3}>About</Typography>
                  <TextField
                    style={{ marginTop: "10px" }}
                    multiline
                    variant="outlined"
                    fullWidth
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                  />

                  <Typography className={classes.pro_typo3}>
                    Areas of interest
                  </Typography>
                  <ReactChipInput
                    placeholder="dddsv"
                    chips={interest}
                    onSubmit={(value) => addInterests(value)}
                    onRemove={(index) => removeInterests(index)}
                  />

                  <Typography className={classes.pro_typo3}>
                    Top skills
                  </Typography>
                  <ReactChipInput
                    chips={skills}
                    onSubmit={(value) => addSkill(value)}
                    onRemove={(index) => removeSkill(index)}
                  />

                  <Typography className={classes.pro_typo3}>
                    Looking for
                  </Typography>
                  <Box component="div" style={{ display: "grid" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.careerAdvice ? true : false}
                          onChange={handleChangeGoals}
                          name="careerAdvice"
                        />
                      }
                      label="Career Advice"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.resumeReview ? true : false}
                          onChange={handleChangeGoals}
                          name="resumeReview"
                        />
                      }
                      label="Resume review"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.mockInterview ? true : false}
                          onChange={handleChangeGoals}
                          name="mockInterview"
                        />
                      }
                      label="Mock interview"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.projectReview ? true : false}
                          onChange={handleChangeGoals}
                          name="projectReview"
                        />
                      }
                      label="Project review"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals?.collaboration ? true : false}
                          onChange={handleChangeGoals}
                          name="collaboration"
                        />
                      }
                      label="Collaboration on an idea"
                    />
                    {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={
                          <CheckBoxOutlineBlank style={{ fontSize: "30px" }} />
                        }
                        checkedIcon={
                          <StopRounded
                            style={{ color: "#51B6A5", fontSize: "30px" }}
                          />
                        }
                        name="checkedH"
                      />
                    }
                    label="Inspiration"
                  /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.businessAdvice ? true : false}
                          onChange={handleChangeGoals}
                          name="businessAdvice"
                        />
                      }
                      label="Business advice"
                    />
                    {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={
                          <CheckBoxOutlineBlank style={{ fontSize: "30px" }} />
                        }
                        checkedIcon={
                          <StopRounded
                            style={{ color: "#51B6A5", fontSize: "30px" }}
                          />
                        }
                        name="checkedH"
                      />
                    }
                    label="Career change advice"
                  /> */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <CheckBoxOutlineBlank
                              style={{ fontSize: "30px" }}
                            />
                          }
                          checkedIcon={
                            <StopRounded
                              style={{ color: "#51B6A5", fontSize: "30px" }}
                            />
                          }
                          checked={goals.skillDevelopment ? true : false}
                          onChange={handleChangeGoals}
                          name="skillDevelopment"
                        />
                      }
                      label="Skill development"
                    />
                  </Box>
                  <Typography className={classes.pro_typo3}>
                    Social Media
                  </Typography>

                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Twitter</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Twitter}
                        onChange={handleChangeSocialLinks}
                        name="Twitter"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Medium</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Medium}
                        onChange={handleChangeSocialLinks}
                        name="Medium"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                  {/* //--------------------------------------------------------------------- */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Behance</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Behance}
                        onChange={handleChangeSocialLinks}
                        name="Behance"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                  {/* //--------------------------------------------------------------------- */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Github</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Github}
                        onChange={handleChangeSocialLinks}
                        name="Github"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                  {/* //--------------------------------------------------------------------- */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Portfolio </Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Portfolio}
                        onChange={handleChangeSocialLinks}
                        name="Portfolio"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                  {/* //--------------------------------------------------------------------- */}
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.social_div}
                  >
                    <Grid item xs={12} md={2} lg={2}>
                      <Typography>Other</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                      <TextField
                        variant="outlined"
                        placeholder="https://"
                        fullWidth
                        value={socialLinks?.Other}
                        onChange={handleChangeSocialLinks}
                        name="Other"
                      />
                    </Grid>
                  </Grid>
                  {/* //--------------------------------------------------------------------- */}
                </Grid>
              </Grid>
            </Container>
          </ThemeProvider>
        </Box>
      )}
      <div style={{ backgroundColor: "#f5f3f8" }}>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}
