import React, { useState } from 'react'
import { Container, DotStepper, Title, TitleWrapper } from "../../components"
import { TextField } from '@material-ui/core'
import ReactChipInput from "react-chip-input"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 1em 0;
`

class RegisterStep3 extends React.Component {
  state = {
    skills: this.props.values.skills,
    interests:this.props.values.interests
  }

  addSkill = value => {
    const skills = this.state.skills.slice();
    skills.push(value);
    this.setState({ skills })
    this.props.handleSkills(skills)
  }

  removeSkill = index => {
    const skills = this.state.skills.slice();
    skills.splice(index, 1)
    this.setState({ skills })
    this.props.handleSkills(skills)
  }

  addInterests = value => {
    const interests = this.state.interests.slice();
    interests.push(value)
    this.setState({ interests })
    this.props.handleInterests(interests)
  }

  removeInterests = index => {
    const interests = this.state.interests.slice();
    interests.splice(index, 1)
    this.setState({ interests })
    this.props.handleInterests(interests)
  }

  render() {
    return (
      <Container>
        <TitleWrapper>
          <Title>Lets get more specific.</Title>
        </TitleWrapper>
        <Wrapper>
          <p>What are some of your top skills?</p>
          <ReactChipInput
            classes="class1 class2"
            chips={this.state.skills}
            onSubmit={value => this.addSkill(value)}
            onRemove={index => this.removeSkill(index)}
          />
        </Wrapper>
        <Wrapper style={{marginTop:"3em"}}>
          <p>What are your areas of interest?</p>
          <ReactChipInput
            classes="class1 class2"
            chips={this.state.interests}
            onSubmit={value => this.addInterests(value)}
            onRemove={index => this.removeInterests(index)}
          />
        </Wrapper>
        <DotStepper
          activeStep={2}
          handleNext={this.props.handleNext}
        />
      </Container>
    )
  }
}

export default RegisterStep3