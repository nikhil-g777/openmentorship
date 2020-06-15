import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

const RegisterStep1 = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Tell us a little bit about yourself so we can match you with the right mentors.</Title>
      </TitleWrapper>
      <DotStepper
        activeStep={0}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep1