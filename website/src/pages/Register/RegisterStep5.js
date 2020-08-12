import React from 'react'
import { BackButton, Container, DotStepper, Title, TitleWrapper } from "../../components"
import { updateUser } from "../../api"

import { InputLabel, TextField } from '@material-ui/core'


const RegisterStep5 = props => {

  const userId = localStorage.getItem("userId")
  
  let startDate = `${props.values.startMonth} ${props.values.startYear}`

  function handleUpdateUser() {
    updateUser({
      _id: userId,
      user: {
        userType: "mentee",
        WorkExperiences: [
          {
          title: props.values.title,
            company: props.values.company,
            location: {
              city: props.values.city,
              state: "",
              country: ""
            },
            industry: props.values.industry, 
            startDate: "2018-01-01",
            currentlyWorking: props.values.currentRole,
            endDate: "2020-01-01"
          }
        ],
        skills: props.values.skills,
        interests: props.values.interests,
        goals:props.values.goals,
        communicationFrequency:props.values.cummunicationFrequency,
        socialLinks: {
          twitter: "",
          medium: ""
        },
        active: false
      }
    }).then((response) => {
      console.log(response.data);
      props.handleNext()
    }).catch((error) => {
      console.log(error)
    })
  }
  const socialOptions = ["Twitter", "Medium", "Behance", "Github", "Portfolio", "Other" ]
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Lastly, add your social media links to your profile.</Title>
      </TitleWrapper>
      {socialOptions.map((item) => {
        return(
          <>
          <InputLabel htmlFor="component-simple">{item}</InputLabel>
          <TextField  
            variant="outlined" 
            fullWidth={true}
            type="text"
            name={item}
            defaultValue={props.values.socialMedia[item]}
            placeholder="https://"
            onChange={props.handleSocialMedia}
          />
          </>
        )
      })}
      <DotStepper
        activeStep={4}
        handleNext={handleUpdateUser}
        positionBottom={true}
      />
    </Container>
  )
}

export default RegisterStep5