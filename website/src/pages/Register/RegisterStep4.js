import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

const RegisterStep4 = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Mentorship</Title>
      </TitleWrapper>
      <DotStepper
        activeStep={3}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep4