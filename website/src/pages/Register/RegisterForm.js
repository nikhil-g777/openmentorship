import React, { useState } from "react";
import RegisterMain from "./RegisterMain";
import RegisterStep1 from "./RegisterStep1";
import SorryPage from "./SorryPage";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import RegisterStep5 from "./RegisterStep5";
import PostRegistration from "./postRegistration/PostRegistration";
import { Menu } from "../../components";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import { Box, Container } from "@material-ui/core";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  navWrapper: {
    marginBottom: "12px",
    display: "block",
    boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
}));
export default function RegisterForm() {
  const history = useHistory();
  const classes = useStyles();

  const [state, setState] = useState({
    headline: "",
    bio: "",
    userType: "mentee",
    careerStatus: "Student",
    areasOfInterest: {
      software: false,
      design: false,
      other: false,
    },
    experiences: [],
    education: [],
    skills: [],
    interests: [],
    goals: [],
    communicationFrequency: "",
    communicationPreferences: [],
    socialLinks: {},
  });

  //change back to 0
  const [activeStep, setActiveStep] = useState(0);
  const [errorState, setErrorState] = useState(false);

  // useEffect(() => {
  //   window.history.pushState(
  //     { name: "browserBack" },
  //     "on browser back click",
  //     window.location.href
  //   );
  //   window.history.pushState(
  //     { name: "browserBack" },
  //     "on browser back click",
  //     window.location.href
  //   );
  // }, []);
  // window.addEventListener(
  //   "popstate",
  //   (event) => {
  //     if (event.state) {
  //       setPageState(true);
  //     } else {
  //       history.push("/");
  //       setPageState(false);
  //     }
  //   },
  //   false
  // );


  const handleNext = () => {
    console.log(activeStep);
    console.log(state);
    if (activeStep == 1 && state.areasOfInterest.other == true) {
      // Soory page for other areas
      setActiveStep(11);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleNextStep2 = () => {
    if (activeStep == 2) {
      let valid = true;
      state.experiences.forEach((exp) => {
        if (exp.organization == "" || exp.title == "") {
          valid = false;
          // NotificationManager.error("Please select at least one option“");
          setErrorState(true);
        }
      });

      state.education.forEach((edu) => {
        if (edu.college == "" || edu.degree == "") {
          valid = false;
          setErrorState(true);
        }
      });
      if (valid == false) {
        setState({ ...state, emptyField: true });
      } else {
        setErrorState(false);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setErrorState(false);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleNextStep4 = () => {
    if (
      activeStep == 4 &&
      state.communicationFrequency !== "" &&
      state.goals.length !== 0 &&
      state.communicationPreferences.length !== 0
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setErrorState(false);
    } else {
      setState({ ...state, emptyField: true });
      setErrorState(true);
    }
  };

  const handleBack = () => {
    if (activeStep == 11) {
      setActiveStep(1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, emptyField: false, [name]: value });
  };

  const handleUpdate = (key, val) => {
    setState({ ...state, [key]: val });
  };

  const handleUserType = (type) => {
    setState({ ...state, userType: type });
  };

  const handleCareerStatus = (status) => {
    setState({ ...state, careerStatus: status });
  };

  const handleCheckbox = (e) => {
    setState({
      ...state,
      emptyField: false,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSkills = (value) => {
    setState({ ...state, skills: value });
  };

  const handleInterests = (value) => {
    setState({ ...state, interests: value });
  };

  const handleGoals = (values) => {
    setState({ ...state, goals: values });
  };

  const handleCommunicationFrequency = (value) => {
    setState({ ...state, communicationFrequency: value });
  };

  const handleCommunicationPreferences = (value) => {
    setState({ ...state, communicationPreferences: value });
  };

  const handlesocialLinks = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      socialLinks: {
        ...prevState.socialLinks,
        [name]: value,
      },
    }));
  };
  const {
    firstName,
    lastName,
    email,
    headline,
    bio,
    userType,
    careerStatus,
    areasOfInterest,
    experiences,
    education,
    skills,
    interests,
    goals,
    communicationFrequency,
    communicationPreferences,
    socialLinks,
  } = state;

  const values = {
    firstName,
    lastName,
    email,
    headline,
    bio,
    userType,
    careerStatus,
    areasOfInterest,
    experiences,
    education,
    skills,
    interests,
    goals,
    communicationFrequency,
    communicationPreferences,
    socialLinks,
  };
  switch (activeStep) {
    case 0:
      return (
        <>
          {/* <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu
              handleBack={() => history.push("/")}
              registrationMenu={true}
            />
          </Box> */}
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => history.push("/")}
                registrationMenu={true}
                showBackButton={false}
              />
            </Container>
          </Box>
          <RegisterMain
            handleInput={handleInput}
            values={values}
            handleUpdate={handleUpdate}
            handleNext={handleNext}
          />
        </>
      );
    case 1:
      return (
        <>
          {/* <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
          </Box> */}
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(0)}
                registrationMenu={true}
                showBackButton={true}
              />
            </Container>
          </Box>
          <RegisterStep1
            handleUserType={handleUserType}
            handleCareerStatus={handleCareerStatus}
            handleUpdate={handleUpdate}
            values={values}
            handleNext={handleNext}
          />
        </>
      );
    case 11:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(1)}
                registrationMenu={true}
                showBackButton={true}
              />
            </Container>
          </Box>
          <SorryPage />
        </>
      );
    case 2:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(1)}
                registrationMenu={true}
                showBackButton={true}
              />
            </Container>
          </Box>
          <RegisterStep2
            handleInput={handleInput}
            handleCheckbox={handleCheckbox}
            handleUpdate={handleUpdate}
            values={values}
            handleBack={handleBack}
            handleNextStep2={handleNextStep2}
            errorState={errorState}
          />
          {/* </Box> */}
        </>
      );
    case 3:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(2)}
                registrationMenu={true}
                showBackButton={true}
              />
            </Container>
          </Box>
          <RegisterStep3
            handleNext={handleNext}
            handleSkills={handleSkills}
            handleInterests={handleInterests}
            values={values}
          />
        </>
      );
    case 4:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(3)}
                registrationMenu={true}
                showBackButton={true}
              />
            </Container>
          </Box>
          <RegisterStep4
            handleNext={handleNextStep4}
            handleInput={handleInput}
            handleGoals={handleGoals}
            handleCommunicationFrequency={handleCommunicationFrequency}
            handleCommunicationPreferences={handleCommunicationPreferences}
            values={values}
            errorState={errorState}
          />
        </>
      );
    case 5:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(4)}
                registrationMenu={false}
                showBackButton={true}
              />
            </Container>
          </Box>
          <RegisterStep5
            handleNext={handleNext}
            handlesocialLinks={handlesocialLinks}
            values={values}
          />
        </>
      );
    case 6:
      return (
        <>
          <Box className={classes.navWrapper}>
            <Container>
              <Menu
                handleBack={() => setActiveStep(5)}
                registrationMenu={true}
                showBackButton={false}
              />
            </Container>
          </Box>
          <PostRegistration userType={userType} />
        </>
      );
  }

}
