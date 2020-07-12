import React from 'react'
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';

const DotStepper = props => {
  return(
    <MobileStepper
      style={props.positionBottom ? {} : {bottom: 0}}
      variant="dots"
      steps={5}
      position="static"
      activeStep={props.activeStep}
      nextButton={<Button onClick={props.handleNext} disabled={props.disabled}>Continue</Button>}
    />
  )
}
export default DotStepper