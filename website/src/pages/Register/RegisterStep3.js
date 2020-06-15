import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

const RegisterStep3 = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Lets get more specific.</Title>
      </TitleWrapper>
      <DotStepper
        activeStep={2}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep3