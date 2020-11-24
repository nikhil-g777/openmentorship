import React, { useState } from 'react';
import RegisterMain from "./RegisterMain"
import RegisterStep1 from "./RegisterStep1"
import RegisterStep2 from "./RegisterStep2"
import RegisterStep3 from "./RegisterStep3"
import RegisterStep4 from "./RegisterStep4"
import RegisterStep5 from "./RegisterStep5"
import PostRegistration from "./postRegistration/PostRegistration"

export default function RegisterForm() {
  const [ state, setState ] = useState({
    userType: "mentee",
    jobStatus: "Looking for a job",
    jobTitle: "",
    company: "",
    city: "",
    jobState: "",
    country: "",
    industry: "-",
    noExperience: false,
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
    emptyField: false
  })

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNextStep2 = () => {
    if(activeStep == 2 && state.noExperience === false) {
      if(state.jobTitle == "" || state.company == "" || state.city == "" || state.jobState == "" || state.country == "" || state.startMonth == "" || state.startYear == "")
        setState({...state, emptyField: true})
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInput = e => {
    const { name, value } = e.target
    setState({...state, emptyField: false, [name]:value })
  }

  const handleUserType = type => {
    setState({...state, userType:type})
  }

  const handleJobStatus = status => {
    setState({...state, jobStatus:status})
  }

  const handleCheckbox = e => {
    setState({...state, emptyField: false, [e.target.name]: e.target.checked})
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
  const { userType, jobStatus, jobTitle, company, city, jobState, country, industry, noExperience, currentRole, startMonth, startYear, endMonth, endYear, skills, interests, goals, communicationFrequency, socialLinks, emptyField } = state
  const values = { userType, jobStatus, jobTitle, company, city, jobState, country, industry, noExperience, currentRole, startMonth, startYear, endMonth, endYear, skills, interests, goals, communicationFrequency, socialLinks, emptyField }

  console.log(state)
  switch(activeStep) {
    case 0:
      return (
        <RegisterMain 
          handleInput={handleInput}
          values={values}
          handleNext={handleNext}
        />
      );
    case 1:
      return (
        <RegisterStep1 
          handleUserType={handleUserType}
          handleJobStatus={handleJobStatus}
          values={values}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )
    case 2:
      return (
        <RegisterStep2 
          handleInput={handleInput}
          handleCheckbox={handleCheckbox}
          values={values}
          handleBack={handleBack}
          handleNext={handleNext}
          handleNextStep2={handleNextStep2}
        />
      )
    case 3:
      return (                              
        <RegisterStep3 
          handleNext={handleNext}
          handleSkills={handleSkills}
          handleInterests={handleInterests}
          values={values}
          handleBack={handleBack}
        />
      )
    case 4:
      return (
        <RegisterStep4
          handleNext={handleNext}
          handleInput={handleInput}
          handleGoals={handleGoals}
          handleCommunicationFrequency={handleCommunicationFrequency}
          values={values}
          handleBack={handleBack}
        />
    )
    case 5:
      return (
        <RegisterStep5
          handleNext={handleNext}
          handlesocialLinks={handlesocialLinks}
          values={values}
          handleBack={handleBack}
        />
    )
    case 6:
      return (
        <PostRegistration 
          handleBack={handleBack}
        />
    )
  }
}