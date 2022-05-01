import React, { useState } from "react";
import { Container, DotStepper, Title, TitleWrapper } from "../../components";

import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  SnackbarContent,
  Box,
  Typography
} from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const SectionWrapper = styled.div`
  margin: 1.5em 0;
`;

const useStyles = makeStyles((theme) => ({
  radio: {
    "&$checked": {
      color: "#69b595",
    },
  },
  checked: {},
}));

const RegisterStep4 = (props) => {
  const classes = useStyles();
  const [mentorNeeds, setMentorNeeds] = useState(props.values.mentorship);
  const [goals, setGoals] = useState(props.values.goals);
  const [communicationFrequency, setCommunicationFrequency] = useState(
    props.values.communicationFrequency
  );

  const [communicationPreferences, setCommunicationPreferences] = useState(
    props.values.communicationPreferences
  );

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setGoals({ ...goals, [name]: checked });
    props.handleGoals(goals);
  };

  const handleChangeCommPreferences = (event) => {
    const { name, checked } = event.target;
    console.log("event.target.name: ", event.target.name, "name: ", name);
    setCommunicationPreferences({ ...communicationPreferences, name });
    console.log("communicationPreferences----: ", communicationPreferences);
    props.handleCommunicationPreferences(communicationPreferences);
  };

  const handleFrequency = (event) => {
    props.handleCommunicationFrequency(event.target.value);
    setCommunicationFrequency(event.target.value);
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>Mentorship</Title>
      </TitleWrapper>
      <SectionWrapper>
        <p>What do you need from your Mentor? Select all that apply.</p>
        <SnackbarContent
          message="Pro tip : Being focussed with your goals helps you get better matches."
          style={{ background: "#69b595", margin: "15px 0" }}
        />
        <FormGroup column>
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.careerAdvice}
                onChange={handleChange}
                name="careerAdvice"
                color="primary"
              />
            }
            label="Career advice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.resumeReview}
                onChange={handleChange}
                name="resumeReview"
                color="primary"
              />
            }
            label="Resume review"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.mockInterview}
                onChange={handleChange}
                name="mockInterview"
                color="primary"
              />
            }
            label="Mock interview"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.projectReview}
                onChange={handleChange}
                name="projectReview"
                color="primary"
              />
            }
            label="Project review"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.collaboration}
                onChange={handleChange}
                name="collaboration"
                color="primary"
              />
            }
            label="Collaboration on an idea"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.businessAdvice}
                onChange={handleChange}
                name="businessAdvice"
                color="primary"
              />
            }
            label="Business Advice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={goals.skillDevelopment}
                onChange={handleChange}
                name="skillDevelopment"
                color="primary"
              />
            }
            label="Skill Development"
          />
        </FormGroup>
      </SectionWrapper>
      <SectionWrapper>
        <p>How often would you expect to communicate in your mentorship?</p>
        <FormControl component="fieldset">
          <RadioGroup
            name="frequency"
            value={communicationFrequency}
            onChange={handleFrequency}
          >
            <FormControlLabel
              value="weekly"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="Weekly"
            />
            <FormControlLabel
              value="biweekly"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="Bi-weekly"
            />
            <FormControlLabel
              value="onceamonth"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="Once a month"
            />
            <FormControlLabel
              value="nopreference"
              control={
                <Radio
                  classes={{ root: classes.radio, checked: classes.checked }}
                />
              }
              label="No preference"
            />
          </RadioGroup>
        </FormControl>
      </SectionWrapper>
      <SectionWrapper>
        <p>
          How would you prefer to communicate with your Mentor? Select all that
          apply.
        </p>
        <FormGroup column>
          <FormControlLabel
            control={
              <Checkbox
                checked={communicationPreferences?.phoneCall}
                onChange={handleChangeCommPreferences}
                name="phoneCall"
                color="primary"
              />
            }
            label="Phone call"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={communicationPreferences?.videoCall}
                onChange={handleChangeCommPreferences}
                name="videoCall"
                color="primary"
              />
            }
            label="Video call"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={communicationPreferences?.chatOrMessaging}
                onChange={handleChangeCommPreferences}
                name="chatOrMessaging"
                color="primary"
              />
            }
            label="Chat or Messaging"
          />
        </FormGroup>
      </SectionWrapper>
      {props.errorState && (
        <Box style={{ backgroundColor: "#F2DEE0", minHeight: 40, padding: 10 }}>
          <Typography style={{ color: "#A16F70" }}>
            Please choose at least one option on every section
          </Typography>
        </Box>
      )}
      <DotStepper
        activeStep={3}
        handleNext={props.handleNext}
        positionBottom={true}
      />
    </Container>
  );
};

export default RegisterStep4;
