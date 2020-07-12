import React, { useState } from 'react';
import RegisterMain from "./RegisterMain"
import RegisterStep1 from "./RegisterStep1"
import RegisterStep2 from "./RegisterStep2"
import RegisterStep3 from "./RegisterStep3"
import RegisterStep4 from "./RegisterStep4"
import RegisterStep5 from "./RegisterStep5"
import RegisterNextSteps from "./RegisterNextSteps"
import RegisterAccepts from "./RegisterAccepts"
import RegisterWaits from "./RegisterWaits"

export default function RegisterForm() {
  const [ state, setState ] = useState({
    name: "",
    email: "",
    password: "",
    userType: "mentee",
    jobStatus: "Looking for a job",
    jobTitle: "",
    company: "",
    location: "",
    industry: "-",
    currentRole: false,
    startMonth: "",
    startYear: "",  
    endMonth: "",
    endYear: "",
    jobs: [],
    skills: [],
    interests: [],
    mentorship:{
      frequency: ""
    },
  })

  const [activeStep, setActiveStep] = React.useState(0);

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

  const handleIndustry = industry => {
    setState({...state, industry:industry})
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

  const handleMentorship = values => {
    setState({...state, mentorship:values})
  }
  const { name, email, password, userType, jobStatus, jobTitle, company, location, industry, currentRole, startMonth, startYear, skills, interests, mentorship } = state
  const values = { name, email, password, userType, jobStatus, jobTitle, company, location, industry, currentRole, startMonth, startYear, skills, interests, mentorship }
  
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
          handleIndustry={handleIndustry}
          handleCheckbox={handleCheckbox}
          values={values}
          handleBack={handleBack}
          handleNext={handleNext}
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
          handleMentorship={handleMentorship}
          values={values}
          handleBack={handleBack}
        />
    )
    case 5:
      return (
        <RegisterStep5
          handleNext={handleNext}
          handleInput={handleInput}
          values={values}
          handleBack={handleBack}
        />
    )
    case 6:
      return (
        <RegisterNextSteps
          handleBack={handleBack}
          handleNext={handleNext}
        />
    )
    case 7:
      return (
        <RegisterAccepts
        />
    )
    case 6:
      return (
        <RegisterWaits
        />
    )
  }
}