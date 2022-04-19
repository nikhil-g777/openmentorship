import React, { useEffect, useState } from "react";
import { Container, DotStepper, Title, TitleWrapper } from "../../components";
import {
  Button,
  makeStyles,
  withStyles,
  Box,
  Typography,
} from "@material-ui/core";
import ExperienceCard from "./components/ExperienceCard";

import styled from "styled-components";

const maxExperience = 3;

const AddExpContainer = styled.div`
  margin-bottom: 4.5rem;
`;

const AddContainer = styled.div`
  margin-bottom: 1rem;
`;

const generateId = () => Math.floor(Math.random() * 10000);

const AddButton = withStyles({
  label: {
    "text-decoration": "underline",
  },
})(Button);

const RegisterStep2 = (props) => {
  const { handleUpdate, values, handleNextStep2, errorState } = props;
  const [experiences, setExperiences] = useState([
    {
      id: generateId(),
      organization: "",
      title: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      id: generateId(),
      school: "",
      degree: "",
    },
  ]);

  useEffect(() => {
    handleUpdate("experiences", experiences);
  }, [experiences]);

  useEffect(() => {
    handleUpdate("education", education);
  }, [education]);

  const handleClearExperience = (event) => {
    let id = event.currentTarget.id;
    let updatedExperiences = experiences.filter((exp) => {
      return exp.id != id;
    });
    setExperiences(updatedExperiences);
  };

  const handleChangeExperience = (event) => {
    let textFieldId = event.currentTarget.id;
    let id = textFieldId.split("_")[1];
    let { name, value } = event.currentTarget;
    let updatedExperiences = [];
    experiences.forEach((exp) => {
      if (exp.id == id) {
        exp[name] = value;
      }
      updatedExperiences.push(exp);
    });
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    if (experiences.length < maxExperience) {
      setExperiences((prevExperiences) => [
        ...prevExperiences,
        {
          id: generateId(),
          organization: "",
          title: "",
        },
      ]);
    }
  };

  const handleClearEducation = (event) => {
    let id = event.currentTarget.id;
    let updatedEducation = education.filter((edu) => {
      return edu.id != id;
    });
    setEducation(updatedEducation);
  };

  const handleChangeEducation = (event) => {
    let textFieldId = event.currentTarget.id;
    let id = textFieldId.split("_")[1];
    let { name, value } = event.currentTarget;
    let updatedEducation = [];
    education.forEach((exp) => {
      if (exp.id == id) {
        exp[name] = value;
      }
      updatedEducation.push(exp);
    });
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    if (education.length < maxExperience) {
      setEducation((prevEducation) => [
        ...prevEducation,
        {
          id: generateId(),
          school: "",
          degree: "",
        },
      ]);
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>Work Experience</Title>
      </TitleWrapper>
      {experiences.map((exp) => {
        return (
          <ExperienceCard
            key={exp.id}
            id={exp.id}
            title1="organization"
            value1={exp.organization}
            title2="title"
            value2={exp.title}
            handleChange={handleChangeExperience}
            handleClear={handleClearExperience}
            errorState={errorState}
          ></ExperienceCard>
        );
      })}
      {experiences.length < maxExperience && (
        <AddExpContainer>
          <AddButton onClick={handleAddExperience}>Add Experience</AddButton>
        </AddExpContainer>
      )}

      <TitleWrapper>
        <Title>Education</Title>
      </TitleWrapper>

      {education.map((edu) => {
        return (
          <ExperienceCard
            key={edu.id}
            id={edu.id}
            title1="school"
            value1={edu.organization}
            title2="degree"
            value2={edu.title}
            handleChange={handleChangeEducation}
            handleClear={handleClearEducation}
            errorState={errorState}
          ></ExperienceCard>
        );
      })}

      {education.length < maxExperience && (
        <AddContainer>
          <AddButton onClick={handleAddEducation}>Add Education</AddButton>
        </AddContainer>
      )}

      {errorState && (
        <Box style={{ backgroundColor: "#F2DEE0", minHeight: 40, padding: 10 }}>
          <Typography style={{ color: "#A16F70" }}>
            Please fill the required fields
          </Typography>
        </Box>
      )}
      <DotStepper
        activeStep={1}
        handleNext={handleNextStep2}
        positionBottom={true}
      />
    </Container>
  );
};

export default RegisterStep2;
