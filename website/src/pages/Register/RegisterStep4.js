import React, { useState } from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"

import { FormGroup, FormControl, FormControlLabel, Checkbox, Radio, RadioGroup } from "@material-ui/core"
import styled from 'styled-components'

const SectionWrapper = styled.div`
  margin:1.5em 0;
`

const RegisterStep4 = props => {
  const [ mentorNeeds, setMentorNeeds ] = useState(props.values.mentorship)

  const handleChange = (event) => {
    setMentorNeeds(prev => ({...prev, [event.target.name]: event.target.checked }))
    props.handleMentorship(mentorNeeds)
  };

  const handleFrequency = (event) => {
    setMentorNeeds(prev => ({...prev, frequency:event.target.value}))
    props.handleMentorship(mentorNeeds)
  }

  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Mentorship</Title>
      </TitleWrapper>
      <SectionWrapper>
        <p>What do you need from your Mentor? Select all that apply.</p>
        <FormGroup column>
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.careerAdvice} onChange={handleChange} name="careerAdvice" color="primary" />}
            label="Career advice"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.resumeReview} onChange={handleChange} name="resumeReview" color="primary" />}
            label="Resume review"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.mockInterview} onChange={handleChange} name="mockInterview" color="primary" />}
            label="Mock interview"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.projectReview} onChange={handleChange} name="projectReview" color="primary" />}
            label="Project review"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.collaboration} onChange={handleChange} name="collaboration" color="primary" />}
            label="Collaboration on an idea"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.inspiration} onChange={handleChange} name="inspiration" color="primary" />}
            label="Inspiration"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.businessAdvice} onChange={handleChange} name="businessAdvice" color="primary" />}
            label="Business Advice"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.careerChange} onChange={handleChange} name="careerChange" color="primary" />}
            label="Career Change Advice"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.skillDevelopment} onChange={handleChange} name="skillDevelopment" color="primary" />}
            label="Skill Development"
          />
        </FormGroup>
      </SectionWrapper>
      <SectionWrapper>
        <p>How often would you expect to communicate in your mentorship?</p>
        <FormControl component="fieldset">
          <RadioGroup name="frequency" value={mentorNeeds.frequency} onChange={handleFrequency}>
            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
            <FormControlLabel value="biweekly" control={<Radio />} label="Bi-weekly" />
            <FormControlLabel value="onceamonth" control={<Radio />} label="Once a month" />
            <FormControlLabel value="nopreference" control={<Radio />} label="No preference" />
          </RadioGroup>
        </FormControl>
      </SectionWrapper>
      <SectionWrapper>
        <p>How would you prefer to communicate with your Mentor? Select all that apply.</p>
        <FormGroup column>
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.phoneCall} onChange={handleChange} name="phoneCall" color="primary" />}
            label="Phone call"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.videoCall} onChange={handleChange} name="videoCall" color="primary" />}
            label="Video call"
          />
          <FormControlLabel
            control={<Checkbox checked={mentorNeeds.chatOrMessaging} onChange={handleChange} name="chatOrMessaging" color="primary" />}
            label="Chat or Messaging"
          />
        </FormGroup>
      </SectionWrapper>
      <DotStepper
        activeStep={3}
        handleNext={props.handleNext}
        positionBottom={true}
      />
    </Container>
  )
}

export default RegisterStep4