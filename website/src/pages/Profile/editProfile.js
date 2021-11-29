import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import "fontsource-roboto";
import SocialIcon1 from "../../images/image 24.png";
import SocialIcon2 from "../../images/image 23.png";
import linked from "../../images/image 16.png";
import editIcon from "../../images/edit 1.png";
import {
  CheckBoxOutlineBlank,
  CropSquareOutlined,
  SquareFoot,
  StopRounded,
} from "@material-ui/icons";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Menu } from "../../components";
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const history = useHistory();
  const [about, setAbout] = useState("I am a second-year UCLA Regents Scholar interested in digital health, healthcare management, population health studies, and social innovation. I am experienced in email marketing techniques, SEO and brand analytics.");
  const [interest, setInterest] = useState("Public health, social innovation, digital health, healthcare management");
  const [skills, setSkills] = useState("Marketing techniques, SEO, brand analytics, email marketing");

  const data = [1, 1, 1, 1, 1, 1];
  return (
    <div>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
      <div
        style={{
          backgroundColor: "#F1F4F4",
          paddingBottom: 50,
        }}
      >
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
                      Emily Lee
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
                      Emily Lee
                    </Typography>

                    <img src={linked} style={{ marginLeft: "3%" }} />
                  </Box>
                  <Box component="div" className={classes.pro_typo_div2}>
                    <img src={editIcon} width="23px" height="23px" />
                    <Typography className={classes.edit_txt}>Save</Typography>
                  </Box>
                </Box>
                <Typography className={classes.pro_typo2}>
                  Marketing Intern at Propeller Health<br></br>Cognitive Science
                  at UCLA 2022
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
                <TextField
                  style={{ marginTop: "10px" }}
                  multiline
                  variant="outlined"
                  fullWidth
                  value={interest}
                  onChange={(event) => setInterest(event.target.value)}
                />

                <Typography className={classes.pro_typo3}>
                  Top skills
                </Typography>
                <TextField
                  style={{ marginTop: "10px" }}
                  multiline
                  variant="outlined"
                  fullWidth
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}

                />

                <Typography className={classes.pro_typo3}>
                  Looking for
                </Typography>
                <Box component="div" style={{ display: "grid" }}>
                  <FormControlLabel
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
                    label="Career Advice"
                  />
                  <FormControlLabel
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
                    label="Resume review"
                  />
                  <FormControlLabel
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
                    label="Mock interview"
                  />
                  <FormControlLabel
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
                    label="Project review"
                  />
                  <FormControlLabel
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
                    label="Collaboration on an idea"
                  />
                  <FormControlLabel
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
                  />
                  <FormControlLabel
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
                    label="Business advice"
                  />
                  <FormControlLabel
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
                  />
                  <FormControlLabel
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
                    />
                  </Grid>
                </Grid>
                {/* //--------------------------------------------------------------------- */}
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </div>
      <div style={{ backgroundColor: "#f5f3f8" }}>
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
