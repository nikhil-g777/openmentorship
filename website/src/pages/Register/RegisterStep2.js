import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

const RegisterStep2 = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Work Experience</Title>
      </TitleWrapper>
      <DotStepper
        activeStep={1}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep2