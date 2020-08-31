import React from "react";
import {
  BackButton,
  Container,
  DotStepper,
  Title,
  TitleWrapper,
} from "../../components";
import { updateUser } from "../../api";

import { InputLabel, TextField } from "@material-ui/core";

const RegisterStep5 = (props) => {
  const userId = localStorage.getItem("userId");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthNameToNum = (monthname) => {
    let month = months.indexOf(monthname);
    return month != -1 ? month + 1 : undefined;
  };
  let startMonth = monthNameToNum(props.values.startMonth);
  let endMonth = monthNameToNum(props.values.endMonth);
  let startDateFormatted = `${props.values.startYear}-${startMonth}-01`;
  let endDateFormatted = `${props.values.endYear}-${endMonth}-01`;

  function handleUpdateUser() {
    updateUser({
      _id: userId,
      user: {
        userType: props.values.userType,
        WorkExperiences: [
          {
            title: props.values.title,
            company: props.values.company,
            location: {
              city: props.values.city,
              state: props.values.jobState,
              country: props.values.country,
            },
            industry: props.values.industry,
            startDate: startDateFormatted,
            currentlyWorking: props.values.currentRole,
            endDate: endDateFormatted,
          },
        ],
        skills: props.values.skills,
        interests: props.values.interests,
        goals: props.values.goals,
        communicationFrequency: props.values.cummunicationFrequency,
        socialLinks: props.values.socialLinks,
        active: false,
      },
    })
      .then((response) => {
        props.handleNext();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const socialOptions = [
    "Twitter",
    "Medium",
    "Behance",
    "Github",
    "Portfolio",
    "Other",
  ];
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Lastly, add your social media links to your profile.</Title>
      </TitleWrapper>
      {socialOptions.map((item) => {
        return (
          <>
            <InputLabel htmlFor="component-simple">{item}</InputLabel>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="text"
              name={item}
              defaultValue={props.values.socialLinks[item]}
              placeholder="https://"
              onChange={props.handlesocialLinks}
            />
          </>
        );
      })}
      <DotStepper
        activeStep={4}
        handleNext={handleUpdateUser}
        positionBottom={true}
      />
    </Container>
  );
};

export default RegisterStep5;
