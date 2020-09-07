import React, { useState } from 'react';
import RegisterMain from "./RegisterMain"
import RegisterStep1 from "./RegisterStep1"
import RegisterStep2 from "./RegisterStep2"
import RegisterStep3 from "./RegisterStep3"
import RegisterStep4 from "./RegisterStep4"
import RegisterStep5 from "./RegisterStep5"
import PostRegistration from "./postRegistration/PostRegistration"
import { Menu } from "../../components"

import { useHistory } from "react-router-dom";

export default function RegisterForm() {
  const history = useHistory()

  const [ state, setState ] = useState({
    userType: "mentee",
    jobStatus: "Looking for a job",
    jobTitle: "",
    company: "",
    city: "",
    jobState: "",
    country: "",
    industry: "-",
    currentRole: false,
    startMonth: "",
    startYear: "",  
    endMonth: "",
    endYear: "",
    skills: [],
    interests: [],
    goals:[],
    communicationFrequency: "",
    socialLinks: {},
  })

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInput = e => {
    const { name, value } = e.target
    setState({ ...state, [name]:value})
  }

  const handleUserType = type => {
    setState({...state, userType:type})
  }

  const handleJobStatus = status => {
    setState({...state, jobStatus:status})
  }

  const handleCheckbox = e => {
    setState({...state, [e.target.name]: e.target.checked})
  }

  const handleSkills = value => {
    setState({...state, skills: value})
  }
  
  const handleInterests = value => {
    setState({...state, interests:value})
  }

  const handleGoals = values => {
    setState({...state, goals:values})
  }

  const handleCommunicationFrequency = value => {
    setState({...state, communicationFrequency:value})
  }
  
  const handlesocialLinks = event => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prevState) => ({ 
      ...prevState, 
      socialLinks: {
        ...prevState.socialLinks,
        [name]:value
    }  }))
  }

  const { userType, jobStatus, jobTitle, company, city, jobState, country, industry, currentRole, startMonth, startYear, endMonth, endYear, skills, interests, goals, communicationFrequency, socialLinks } = state
  const values = { userType, jobStatus, jobTitle, company, city, jobState, country, industry, currentRole, startMonth, startYear, endMonth, endYear, skills, interests, goals, communicationFrequency, socialLinks }
  
  switch(activeStep) {
    case 0:
      return (
        <>
          <Menu handleBack={() => history.push("/")} registrationMenu={true}/>
          <RegisterMain 
            handleInput={handleInput}
            values={values}
            handleNext={handleNext}
          />
        </>
      );
    case 1:
      return (
        <>
        <Menu handleBack={handleBack} registrationMenu={true}/>
        <RegisterStep1 
          handleUserType={handleUserType}
          handleJobStatus={handleJobStatus}
          values={values}
          handleNext={handleNext}
        />
        </>
      )
    case 2:
      return (
        <>
          <Menu handleBack={handleBack} registrationMenu={true}/>
          <RegisterStep2 
            handleInput={handleInput}
            handleCheckbox={handleCheckbox}
            values={values}
            handleNext={handleNext}
          />
        </>
      )
    case 3:
      return ( 
        <>    
          <Menu handleBack={handleBack} registrationMenu={true}/>                         
          <RegisterStep3 
            handleNext={handleNext}
            handleSkills={handleSkills}
            handleInterests={handleInterests}
            values={values}
          />
        </>
      )
    case 4:
      return (
        <>    
          <Menu handleBack={handleBack} registrationMenu={true}/>  
          <RegisterStep4
            handleNext={handleNext}
            handleInput={handleInput}
            handleGoals={handleGoals}
            handleCommunicationFrequency={handleCommunicationFrequency}
            values={values}
          />
        </>
    )
    case 5:
      return (
        <>
          <Menu handleBack={handleBack} registrationMenu={true}/>
          <RegisterStep5
            handleNext={handleNext}
            handlesocialLinks={handlesocialLinks}
            values={values}
          />
        </>
    )
    case 6:
      return (
        <>
          <Menu handleBack={handleBack} registrationMenu={true}/>
          <PostRegistration />
        </>
    )
  }
}