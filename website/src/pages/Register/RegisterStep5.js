import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

const RegisterStep5 = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Lastly, add your social media links to your profile.</Title>
      </TitleWrapper>
      <DotStepper
        activeStep={4}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep5