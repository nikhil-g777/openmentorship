import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"
import Button from '@material-ui/core/Button';

const RegisterNextSteps = props => {
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Thanks for signing up with Open Mentorship!</Title>
      </TitleWrapper>
      <Button onClick={props.handleNext}>Continue</Button>
    </Container>
  )
}

export default RegisterNextSteps