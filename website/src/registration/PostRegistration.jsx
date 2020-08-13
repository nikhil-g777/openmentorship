import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  BackArrowTop,
  BackArrowBottom,
  Wrapper,
  PictureTextWrapper,
  TitleText,
  BodyText,
  PictureText,
  MailPicture,
  HumansPicture,
  PenPaperPicture,
  MagnifyPicture,
  HandShakePicture,
  AirplanePicture,
  ThumbsUpPicture,
  ConfirmationTitle,
  ConfirmationText,
  ButtonText,
  ContentWrapper,
  ButtonWrapper,
  WaitTitle,
  WaitText,
} from "./PostRegistrationStyling";

/*
Add two display components that render based off Submit/Wait button click 
Add backend call to send email to user+save user data or just save user data

Create two functions that render the new pages + send api end point calls with the proper data passed
State : change value based on button click -> have the new component render based off state value 
*/

function BackButton() {
  let history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return (
    <div type="button" onClick={handleClick}>
      <BackArrowTop />
      <BackArrowBottom />
    </div>
  );
}

export default class PostRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: this.props.data, signUpResult: null };
    this.userContinue = this.userContinue.bind(this);
    this.userWait = this.userWait.bind(this);
  }

  userContinue() {
    this.setState({ signUpResult: "CONTINUE" });
    // const userData = {
    //   data: this.props.data,
    //   email: true
    // }
    // axios.post(``, { user })
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // })
  }

  userWait() {
    this.setState({ signUpResult: "WAIT" });
    // const userData = {
    //   data: this.props.data,
    //   email: false
    // axios.post(``, { user })
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // })
  }
  render() {
    return {
      CONTINUE: (
        <Wrapper>
          <AirplanePicture />
          <ConfirmationTitle>
            An email confirmation is on its way.
          </ConfirmationTitle>
          <ConfirmationText>
            Thanks for joining OpenMentorshop. We’re excited for you to gain
            success in your career.
          </ConfirmationText>
        </Wrapper>
      ),
      WAIT: (
        <Wrapper>
          <ThumbsUpPicture />
          <WaitTitle>
            No problem! We’ll hold your information until you’re ready.
          </WaitTitle>
          <WaitText>
            Just sign back in and indicate that you’re ready for the mentorship
            session.
          </WaitText>
        </Wrapper>
      ),
      null: (
        <Wrapper>
          <BackButton />
          <TitleText>Thanks for signing up with Open Mentorship!</TitleText>
          <BodyText>
            Please read through these steps, and indicate whether you want to
            continue with the process or wait until you’re ready for a matching
            session.
          </BodyText>

          <ContentWrapper>
            <PictureTextWrapper>
              <MailPicture />
              <PictureText>
                You will recieve an email confirmation of your application.
              </PictureText>
            </PictureTextWrapper>

            <PictureTextWrapper>
              <HumansPicture alt="" />
              <PictureText>
                Within one week, you will recieve a curated list of mentors to
                choose from.
              </PictureText>
            </PictureTextWrapper>

            <PictureTextWrapper>
              <PenPaperPicture alt="" />
              <PictureText>
                You will have one week from the day you recieve the list to
                message each of your top choices, explaining why you want to
                work with them.
              </PictureText>
            </PictureTextWrapper>

            <PictureTextWrapper>
              <MagnifyPicture alt="" />
              <PictureText>
                After that period, the mentors will recieve their requests, and
                will have one week to decide on who they want to work with.
              </PictureText>
            </PictureTextWrapper>

            <PictureTextWrapper>
              <HandShakePicture alt="" />
              <PictureText>
                When a match is made, you will have a set amount of time that
                your session will last. Make it count!
              </PictureText>
            </PictureTextWrapper>
          </ContentWrapper>

          <ButtonWrapper>
            <Button onClick={this.userContinue}>
              <ButtonText>I'm In!</ButtonText>
            </Button>
            <Button wait onClick={this.userWait}>
              <ButtonText wait>I'm going to wait.</ButtonText>
            </Button>
          </ButtonWrapper>
        </Wrapper>
      ),
    }[this.state.signUpResult];
  }
}
