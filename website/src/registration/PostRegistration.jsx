import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  BackArrowTop,
  BackArrowBottom,
  Wrapper,
  PictureTextWrapper,
  TitleText,
  BodyText,
  PictureText,
  PictureOne,
  PictureTwo,
  PictureThree,
  PictureFour,
  PictureFive,
  ButtonText,
  ContentWrapper,
  ButtonWrapper,
} from "./PostRegistrationStyling";

/*
Create back button to previous page 
Add two display components that render based off Submit/Wait button click 
Add backend call to send email to user+save user data or just save user data
*/

function BackButton() {
  let history = useHistory();
  function handleClick(){
    history.goBack()
  }
  return (
    <button type="button" onClick={handleClick}>
      <BackArrowTop />
      <BackArrowBottom />
    </button>
  );
}

export default class PostRegistration extends Component {
  render() {
    return (
      <Wrapper>
        <BackButton/>
        <TitleText>Thanks for signing up with Open Mentorship!</TitleText>
        <BodyText>
          Please read through these steps, and indicate whether you want to
          continue with the process or wait until you’re ready for a matching
          session.
        </BodyText>

        <ContentWrapper>
          <PictureTextWrapper>
            <PictureOne />
            <PictureText>
              You will recieve an email confirmation of your application.
            </PictureText>
          </PictureTextWrapper>

          <PictureTextWrapper>
            <PictureTwo alt="" />
            <PictureText>
              Within one week, you will recieve a curated list of mentors to
              choose from.
            </PictureText>
          </PictureTextWrapper>

          <PictureTextWrapper>
            <PictureThree alt="" />
            <PictureText>
              You will have one week from the day you recieve the list to
              message each of your top choices, explaining why you want to work
              with them.
            </PictureText>
          </PictureTextWrapper>

          <PictureTextWrapper>
            <PictureFour alt="" />
            <PictureText>
              After that period, the mentors will recieve their requests, and
              will have one week to decide on who they want to work with.
            </PictureText>
          </PictureTextWrapper>

          <PictureTextWrapper>
            <PictureFive alt="" />
            <PictureText>
              When a match is made, you will have a set amount of time that your
              session will last. Make it count!
            </PictureText>
          </PictureTextWrapper>
        </ContentWrapper>

        <ButtonWrapper>
          <Button>
            <ButtonText>I'm In!</ButtonText>
          </Button>
          <Button wait>
            <ButtonText wait>I'm going to wait.</ButtonText>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}
