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
  FormGroup,
  Grid,
  TextField,
  withStyles,
} from "@material-ui/core";
import {
  Container,
  CircularProgress,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@material-ui/core";
import { CheckBoxOutlineBlank, StopRounded } from "@material-ui/icons";
import "fontsource-roboto";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import styled from "styled-components";

import linked from "../../images/image 16.png";
import editIcon from "../../images/edit 1.png";

import { Title, TitleWrapper, Menu, FormItem } from "../../components";

import Footer from "../../components/Footer";
import ExperienceCard from "../Register/components/ExperienceCard";

import { getUserInfo, updateUser } from "../../redux/Actions/UserActions";
const maxExperience = 3;

const AddExpContainer = styled.div`
  margin-bottom: 4.5rem;
`;

const AddContainer = styled.div`
  margin-bottom: 1rem;
`;

const generateId = () => Math.floor(Math.random() * 10000);

const AddButton = withStyles({
  label: {
    "text-decoration": "underline",
    textTransform: "capitalize",
  },
})(Button);
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
    color: "black",
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
  radio: {
    "&$checked": {
      color: "#69b595",
    },
  },
  checked: {},
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

  const user = userState?.user?.user;
  // console.log(user, "user heree");

  const [about, setAbout] = useState("");
  const [interest, setInterest] = useState([]);
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const commArray = [
    { label: "Phone call", value: "phone" },
    { label: "Video call", value: "video" },
    { label: "Chat or Messaging", value: "chat" },
  ];
  const [communicationFrequency, setCommunicationFrequency] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState({
    software: false,
    design: false,
    other: true,
  });
  const [experiences, setExperiences] = useState([
    {
      id: generateId(),
      organization: "",
      title: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      id: generateId(),
      school: "",
      degree: "",
    },
  ]);
  const [communicationPreferences, setCommunicationPreferences] = useState([]);
  const [alignment, setAlignment] = useState("");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleChangeAreaOfInterest = (event) => {
    const { name, checked } = event.target;
    if (name == "other" && checked) {
      setAreasOfInterest({
        software: false,
        design: false,
        other: true,
      });
    } else {
      setAreasOfInterest({ ...areasOfInterest, [name]: checked, other: false });
    }
  };
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
      setAbout(user?.bio);
      setInterest(user?.interests);
      setSkills(user?.skills);
      setGoals(user?.goals);
      setSocialLinks(user?.socialLinks);
      setCommunicationFrequency(user?.communicationFrequency);
      setAlignment(user?.userType);
      setExperiences(user?.experiences);
      setEducation(user?.education);
      setAreasOfInterest(user?.areasOfInterest);
      setCommunicationPreferences(user?.communicationPreferences);
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
      experiences: experiences,
      education: education,
      areasOfInterest: areasOfInterest,
      communicationFrequency: communicationFrequency,
      userType: alignment,
    };
    await dispatch(
      updateUser({
        type: "updateUser",
        user: userData,
      })
    );
    history.push("/profile");
  };
  const handleClearExperience = (event) => {
    let id = event.currentTarget.id;
    let updatedExperiences = experiences.filter((exp) => {
      return exp.id != id;
    });
    setExperiences(updatedExperiences);
  };

  const handleChangeExperience = (event) => {
    let textFieldId = event.currentTarget.id;
    let id = textFieldId.split("_")[1];
    let { name, value } = event.currentTarget;
    console.log(name,"name",value,"value")

    let updatedExperiences = [];
    experiences.forEach((exp) => {

      if (exp._id == id) {
        exp[name] = value;
      }
      updatedExperiences.push(exp);
    });
    console.log(updatedExperiences,"updatedExperiences")
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    if (experiences.length < maxExperience) {
      setExperiences((prevExperiences) => [
        ...prevExperiences,
        {
          id: generateId(),
          organization: "",
          title: "",
        },
      ]);
    }
  };

  const handleClearEducation = (event) => {
    let id = event.currentTarget.id;
    let updatedEducation = education.filter((edu) => {
      return edu._id != id;
    });
    setEducation(updatedEducation);
  };

  const handleChangeEducation = (event) => {
    let textFieldId = event.currentTarget.id;
    let id = textFieldId.split("_")[1];
    let { name, value } = event.currentTarget;
    let updatedEducation = [];
    education.forEach((exp) => {
      if (exp._id == id) {
        exp[name] = value;
      }
      updatedEducation.push(exp);
    });
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    if (education.length < maxExperience) {
      setEducation((prevEducation) => [
        ...prevEducation,
        {
          id: generateId(),
          school: "",
          degree: "",
        },
      ]);
    }
  };
  const handleChangeCommPreferences = (event, index) => {
    const { name, checked } = event.target;
    let dummyArray = [...communicationPreferences];
    if (checked) {
      dummyArray.push(name);
    } else {
      dummyArray.splice(index);
    }
    setCommunicationPreferences(dummyArray);
  };

  console.log(communicationPreferences, "communicationPreferences");
  const handleFrequency = (event) => {
    setCommunicationFrequency(event.target.value);
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
                  <FormItem>
                    <Typography className={classes.pro_typo3}>
                      Switch profile type:
                    </Typography>
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      size="large"
                      className="mt-3"
                    >
                      <ToggleButton
                        value="mentee"
                        aria-label="left aligned"
                        style={{
                          backgroundColor:
                            alignment === "mentee" ? "#51B6A5" : "white",
                          // marginRight: 20,
                          textTransform: "capitalize",
                        }}
                      >
                        Mentee
                      </ToggleButton>
                      <ToggleButton
                        value="mentor"
                        aria-label="right aligned"
                        style={{
                          backgroundColor:
                            alignment === "mentor" ? "#51B6A5" : "white",
                          textTransform: "capitalize",
                          border: "1px solid gray",
                        }}
                      >
                        Mentor
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </FormItem>
                  <Typography className={classes.pro_typo3}>
                    About me:
                  </Typography>

                  <Typography className={classes.pro_typo3}>About</Typography>

                  <TextField
                    style={{ marginTop: "10px", marginBottom: "50px" }}
                    multiline
                    variant="outlined"
                    fullWidth
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}
                  />
                  <Typography className={classes.pro_typo4}>
                    Which of the following best describes you?{" "}
                  </Typography>
                  <TextField
                    style={{
                      marginTop: "10px",
                      width: "65%",
                      marginBottom: "50px",
                    }}
                    variant="outlined"
                    fullWidth
                    placeholder="Looking for a job"
                    // value={about}
                    // onChange={(event) => setAbout(event.target.value)}
                  />
                  <FormGroup>
                    <Typography className={classes.pro_typo4}>
                      What is your area of interest?{" "}
                    </Typography>
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
                          checked={areasOfInterest.software}
                          onChange={handleChangeAreaOfInterest}
                          name="software"
                          color="primary"
                        />
                      }
                      label="Software"
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
                          checked={areasOfInterest.design}
                          onChange={handleChangeAreaOfInterest}
                          name="design"
                          color="primary"
                        />
                      }
                      label="Design"
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
                          checked={areasOfInterest.other}
                          onChange={handleChangeAreaOfInterest}
                          name="other"
                          color="primary"
                        />
                      }
                      label="Other"
                    />
                  </FormGroup>
                  <Typography className={classes.pro_typo3}>
                    Experience:
                  </Typography>

                  <Typography className={classes.pro_typo3}>
                    Work Experience
                  </Typography>
                  {experiences.map((exp) => {
                    return (
                      <ExperienceCard
                        key={exp._id}
                        id={exp._id}
                        title1="organization"
                        value1={exp.organization}
                        title2="title"
                        value2={exp.title}
                        handleChange={handleChangeExperience}
                        handleClear={handleClearExperience}
                      ></ExperienceCard>
                    );
                  })}
                  {experiences.length < maxExperience && (
                    <AddExpContainer>
                      <AddButton onClick={handleAddExperience}>
                        Add Another Experience
                      </AddButton>
                    </AddExpContainer>
                  )}

                  <TitleWrapper>
                    <Title>Education</Title>
                  </TitleWrapper>

                  {education.map((edu) => {
                    return (
                      <ExperienceCard
                        key={edu._id}
                        id={edu._id}
                        title1="school"
                        value1={edu.school}
                        title2="degree"
                        value2={edu.degree}
                        handleChange={handleChangeEducation}
                        handleClear={handleClearEducation}

                      ></ExperienceCard>
                    );
                  })}

                  {education.length < maxExperience && (
                    <AddContainer>
                      <AddButton onClick={handleAddEducation}>
                        Add Another Education
                      </AddButton>
                    </AddContainer>
                  )}
                  <Typography className={classes.pro_typo3}>
                    Skills and Interest
                  </Typography>
                  <Typography
                    className={classes.pro_typo4}
                    style={{ marginTop: 30 }}
                  >
                    What are some of your top skills?
                  </Typography>
                  <Box style={{ marginTop: 10, marginBottom: 30 }}>
                    <ReactChipInput
                      chips={skills}
                      onSubmit={(value) => addSkill(value)}
                      onRemove={(index) => removeSkill(index)}
                    />
                  </Box>
                  {/* <Typography className={classes.pro_typo3}>
                    Top skills
                  </Typography> */}
                  <Typography className={classes.pro_typo4}>
                    What are your areas of interest?
                  </Typography>
                  <Box style={{ marginTop: 10, marginBottom: 30 }}>
                    <ReactChipInput
                      placeholder="dddsv"
                      chips={interest}
                      onSubmit={(value) => addInterests(value)}
                      onRemove={(index) => removeInterests(index)}
                    />
                  </Box>
                  <Typography className={classes.pro_typo3}>
                    Mentorship Preferences
                  </Typography>
                  <Typography className={classes.pro_typo4}>
                    What do you need from your mentor? Select all that apply.{" "}
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
                  <Typography
                    className={classes.pro_typo4}
                    style={{ marginTop: 40, marginBottom: 20 }}
                  >
                    How often do you expect to communicate in your mentorship?{" "}
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="frequency"
                      value={communicationFrequency}
                      onChange={handleFrequency}
                    >
                      <FormControlLabel
                        value="weekly"
                        control={
                          <Radio
                            classes={{
                              root: classes.radio,
                              checked: classes.checked,
                            }}
                          />
                        }
                        label="Weekly"
                      />
                      <FormControlLabel
                        value="biweekly"
                        control={
                          <Radio
                            classes={{
                              root: classes.radio,
                              checked: classes.checked,
                            }}
                          />
                        }
                        label="Bi-weekly"
                      />
                      <FormControlLabel
                        value="onceamonth"
                        control={
                          <Radio
                            classes={{
                              root: classes.radio,
                              checked: classes.checked,
                            }}
                          />
                        }
                        label="Once a month"
                      />
                      <FormControlLabel
                        value="nopreference"
                        control={
                          <Radio
                            classes={{
                              root: classes.radio,
                              checked: classes.checked,
                            }}
                          />
                        }
                        label="No preference"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Typography
                    className={classes.pro_typo4}
                    style={{ marginTop: 40, marginBottom: 20 }}
                  >
                    What are your communication preferences? Select all that
                    apply{" "}
                  </Typography>
                  <FormGroup column>
                    {commArray.map((x, index) => (
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
                            checked={
                              communicationPreferences.includes(x.value)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleChangeCommPreferences(e, index)
                            }
                            name={x.value}
                            // color="primary"
                          />
                        }
                        label={x.label}
                      />
                    ))}
                  </FormGroup>
                  <Typography
                    className={classes.pro_typo3}
                    style={{ marginTop: 40 }}
                  >
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
