import React from "react";
import { Container, DotStepper, Title, TitleWrapper } from "../../components";
import ReactChipInput from "react-chip-input";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1em 0;
`;

const Span = styled.span`
font-size: 1.4rem;
line-height: 1.42857;
font-weight: 600;
color: rgba(0,0,0,0.9);
margin: 4px 0 12px 0;
text-align: left;
color: #d11124;
font-weight: 500;`

class RegisterStep3 extends React.Component {
  state = {
    skills: this.props.values.skills,
    interests: this.props.values.interests,
  };

  componentDidMount() {
    const skills = this.state.skills;
    skills.push("Communication");
    const interests = this.state.interests;
    interests.push("Tech");
    this.setState({ skills, interests });
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state)
      console.log(this.state.interests.length < 3 || this.state.skills.length < 3)
  }

  addSkill = (value) => {
    const skills = this.state.skills.slice();
    skills.push(value);
    console.log("skills: ", skills);
    this.setState({ skills });
    this.props.handleSkills(skills);
  };

  removeSkill = (index) => {
    const skills = this.state.skills.slice();
    skills.splice(index, 1);
    this.setState({ skills });
    this.props.handleSkills(skills);
  };

  addInterests = (value) => {
    const interests = this.state.interests.slice();
    interests.push(value);
    this.setState({ interests });
    this.props.handleInterests(interests);
  };

  removeInterests = (index) => {
    const interests = this.state.interests.slice();
    interests.splice(index, 1);
    this.setState({ interests });
    this.props.handleInterests(interests);
  };

  render() {
    console.log("this.props.values.skills: ", this.props.values.skills);
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
            onSubmit={(value) => this.addSkill(value)}
            onRemove={(index) => this.removeSkill(index)}
          />
          {this.state.skills.length < 3 && <Span>You must input a total of 3 skills!</Span>}
        </Wrapper>
        <Wrapper style={{ marginTop: "3em" }}>
          <p>What are your areas of interest?</p>
          <ReactChipInput
            classes="class1 class2"
            chips={this.state.interests}
            onSubmit={(value) => this.addInterests(value)}
            onRemove={(index) => this.removeInterests(index)}
          />
          {this.state.interests.length<3 && <Span>You must input a total of 3 interests!</Span>}
        </Wrapper>
        <DotStepper activeStep={2} handleNext={this.props.handleNext} disabled = {this.state.interests.length < 3 || this.state.skills.length < 3}/>
      </Container>
    );
  }
}

export default RegisterStep3;
