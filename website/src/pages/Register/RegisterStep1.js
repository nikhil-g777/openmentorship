import React, { useState } from 'react'
import { BackButton, Container, DotStepper, FormItem, Title, TitleWrapper } from "../../components"

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { BootstrapInput } from "../../app/GlobalTheme"

const RegisterStep1 = props => {
  const [alignment, setAlignment] = useState(props.values.userType)
  const [jobStatus, setJobStatus] = useState(props.values.jobStatus)

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.handleUserType(newAlignment)
  }

  const handleChange = (event) => {
    setJobStatus(event.target.value)
    props.handleJobStatus(event.target.value)
  }

  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Tell us a little bit about yourself so we can match you with the right mentors.</Title>
      </TitleWrapper>
      <FormItem>
        <h6>I am registering as a:</h6>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="mentee" aria-label="left aligned">
            Mentee
          </ToggleButton>
          <ToggleButton value="mentor" aria-label="right aligned">
            Mentor
          </ToggleButton>
        </ToggleButtonGroup>
      </FormItem>
      <FormItem>
        <p>What is your current job status?</p>
        <Select
          value={jobStatus}
          name="jobStatus"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="Looking for a job">Looking for a job</MenuItem>
          <MenuItem value="Currently working">Currently working</MenuItem>
          <MenuItem value="Still in school">Still in school</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormItem>
      <DotStepper
        activeStep={0}
        handleNext={props.handleNext}
      />
    </Container>
  )
}

export default RegisterStep1