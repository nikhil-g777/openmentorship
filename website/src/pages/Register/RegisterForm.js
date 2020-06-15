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
    password: ""
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
  const { name, email, password } = state
  const values = { name, email, password }
  console.log(activeStep)
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
          handleNext={handleNext}
          handleInput={handleInput}
          values={values}
          handleBack={handleBack}
        />
      )
    case 2:
      return (
        <RegisterStep2 
          handleNext={handleNext}
          handleInput={handleInput}
          values={values}
          handleBack={handleBack}
        />
      )
    case 3:
      return (
        <RegisterStep3 
          handleNext={handleNext}
          handleInput={handleInput}
          values={values}
          handleBack={handleBack}
        />
      )
    case 4:
      return (
        <RegisterStep4
          handleNext={handleNext}
          handleInput={handleInput}
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