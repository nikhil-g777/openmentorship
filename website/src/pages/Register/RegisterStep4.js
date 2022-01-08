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
  const [communicationType, setCommunicationType] = useState([]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setGoals({ ...goals, [name]: checked });
    props.handleGoals(goals);
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
                checked={communicationType.phoneCall}
                onChange={handleChange}
                name="phoneCall"
                color="primary"
              />
            }
            label="Phone call"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={communicationType.videoCall}
                onChange={handleChange}
                name="videoCall"
                color="primary"
              />
            }
            label="Video call"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={communicationType.chatOrMessaging}
                onChange={handleChange}
                name="chatOrMessaging"
                color="primary"
              />
            }
            label="Chat or Messaging"
          />
        </FormGroup>
      </SectionWrapper>
      {props.values.emptyField && (
        <p style={{ textAlign: "center" }}>Please choose at least one option</p>
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
