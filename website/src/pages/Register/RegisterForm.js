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

import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";

export default function RegisterForm() {
  const history = useHistory();

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
        }
      });

      state.education.forEach((edu) => {
        if (edu.college == "" || edu.degree == "") {
          valid = false;
        }
      });
      if (valid == false) {
        setState({ ...state, emptyField: true });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleNextStep4 = () => {
    if (
      (activeStep == 4 && state.communicationFrequency !== "") ||
      state.goals.length !== 0
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setState({ ...state, emptyField: true });
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
    console.log(
      "proferences on change: ",
      value,
      "value.name: ",
      value.name,
      "communicationPreferences: ",
      communicationPreferences
    );
    setState({ ...state, communicationPreferences: value.name });
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
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu
              handleBack={() => history.push("/")}
              registrationMenu={true}
            />
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
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
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
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={false} />
          </Box>
          <SorryPage />
        </>
      );
    case 2:
      return (
        <>
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
            <RegisterStep2
              handleInput={handleInput}
              handleCheckbox={handleCheckbox}
              handleUpdate={handleUpdate}
              values={values}
              handleBack={handleBack}
              handleNextStep2={handleNextStep2}
            />
          </Box>
        </>
      );
    case 3:
      return (
        <>
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
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
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
          </Box>
          <RegisterStep4
            handleNext={handleNextStep4}
            handleInput={handleInput}
            handleGoals={handleGoals}
            handleCommunicationFrequency={handleCommunicationFrequency}
            handleCommunicationPreferences={handleCommunicationPreferences}
            values={values}
          />
        </>
      );
    case 5:
      return (
        <>
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
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
          <Box style={{ boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)" }}>
            <Menu handleBack={handleBack} registrationMenu={true} />
          </Box>
          <PostRegistration userType={userType} />
        </>
      );
  }
}
