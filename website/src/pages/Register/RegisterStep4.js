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
  Typography,
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
  const [goals, setGoals] = useState(props.values.goals || []);
  const [communicationFrequency, setCommunicationFrequency] = useState(
    props.values.communicationFrequency
  );

  const [communicationPreferences, setCommunicationPreferences] = useState(
    props.values.communicationPreferences || []
  );

  const handleChange = (event, index) => {
    const { name, checked } = event.target;
    // setGoals({ ...goals, [name]: checked });
    if (checked) {
      goals.push({ [name]: checked });
    } else {
      goals.splice(index);
    }
    props.handleGoals(goals);
  };

  const handleChangeCommPreferences = (event, index) => {
    const { name, checked } = event.target;
    // setCommunicationPreferences({ ...communicationPreferences, name });
    if (checked) {
      communicationPreferences.push({ [name]: checked });
    } else {
      communicationPreferences.splice(index);
    }
    props.handleCommunicationPreferences(communicationPreferences);
  };

  const handleFrequency = (event) => {
    props.handleCommunicationFrequency(event.target.value);
    setCommunicationFrequency(event.target.value);
  };

  const checkIfExist = (x) => {
    let isChecked = false;
    goals.forEach((g) => {
      if (g[x.name]) isChecked = true;
    });
    return isChecked;
  };

  const PreferencesIfExist = (x) => {
    let isChecked = false;
    communicationPreferences.forEach((g) => {
      if (g[x.name]) isChecked = true;
    });
    return isChecked;
  };

  console.log(goals, "goals", props.values);
  const goalArray = [
    { name: "careerAdvice", label: "Career advice" },
    { name: "resumeReview", label: "Resume review" },
    { name: "mockInterview", label: "Mock interview" },
    { name: "projectReview", label: "Project review" },
    { name: "skillDevelopment", label: "Skill Development" },
  ];
  const mentorGoalsArray = [
    { name: "careerAdvice", label: "Career advice" },
    { name: "resumeReview", label: "Resume review" },
    { name: "mockInterview", label: "Mock interview" },
    { name: "projectReview", label: "Project review" },
    { name: "collaboration", label: "Collaboration on an idea" },
    { name: "inspiration", label: "Inspiration" },

    { name: "businessAdvice", label: "Business Advice" },
    { name: "careerChangeAdvice", label: "Career change advice" },
    { name: "skillDevelopment", label: "Skill Development" },

  ]

  const commArray = [
    { name: "phoneCall", label: "Phone call" },
    { name: "videoCall", label: "Video call" },
    { name: "chatOrMessaging", label: "Chat or Messaging" },
  ];
  return (
    <Container>
      <TitleWrapper>
        <Title>Mentorship</Title>
      </TitleWrapper>
      <SectionWrapper>
        {props.values.userType === "mentee" ? (
          <p>What do you need from your Mentor? Select all that apply.</p>
        ) : (
          <p>
            What are you available to offer to your mentee, select all that
            apply.
          </p>
        )}
        <SnackbarContent
          message="Pro tip : Being focussed with your goals helps you get better matches."
          style={{ background: "#69b595", margin: "15px 0" }}
        />
        {props.values.userType === "mentee" ? (
          <FormGroup column>
            {goalArray.map((x, index) => {
              // console.log("xxxxx",x)
              // console.log("goals[x.name]",x)
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkIfExist(x)}
                      onChange={(e) => handleChange(e, index)}
                      name={x.name}
                      color="primary"
                    />
                  }
                  label={x.label}
                />
              );
            })}
          </FormGroup>
        ) : (
          <FormGroup column>
            {mentorGoalsArray.map((x, index) => {
              // console.log("xxxxx",x)
              // console.log("goals[x.name]",x)
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkIfExist(x)}
                      onChange={(e) => handleChange(e, index)}
                      name={x.name}
                      color="primary"
                    />
                  }
                  label={x.label}
                />
              );
            })}
          </FormGroup>
        )}
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
          {commArray.map((x, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={PreferencesIfExist(x)}
                  onChange={(e) => handleChangeCommPreferences(e, index)}
                  name={x.name}
                  color="primary"
                />
              }
              label={x.label}
            />
          ))}
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
