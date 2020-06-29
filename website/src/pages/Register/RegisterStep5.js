import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

import { InputLabel, TextField } from '@material-ui/core'

const RegisterStep5 = props => {

  const socialOptions = ["Twitter", "Medium", "Behance", "Github", "Portfolio", "Other" ]
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Lastly, add your social media links to your profile.</Title>
      </TitleWrapper>
      {socialOptions.map((item) => {
        return(
          <>
          <InputLabel htmlFor="component-simple">{item}</InputLabel>
          <TextField  
            variant="outlined" 
            fullWidth={true}
            type="text"
            name={item}
            defaultValue={props.values.socialMedia[item]}
            placeholder="https://"
            onChange={props.handleSocialMedia}
          />
          </>
        )
      })}
      <DotStepper
        activeStep={4}
        handleNext={props.handleNext}
        positionBottom={true}
      />
    </Container>
  )
}

export default RegisterStep5