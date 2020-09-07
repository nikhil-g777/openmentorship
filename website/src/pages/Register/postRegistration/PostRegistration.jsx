import React, { Component } from "react";
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
import {
  Container,
  TitleWrapper,
  Title,
} from "../../../components";

import { updateUser } from "../../../api";

export default class PostRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: this.props.data, signUpResult: null };
    this.userId = localStorage.getItem("userId");
    this.userContinue = this.userContinue.bind(this);
    this.userWait = this.userWait.bind(this);
  }

  userContinue() {
    updateUser({
      _id: this.userId,
      user: {
        active: true,
      },
    })
      .then((response) => {
        this.setState({ signUpResult: "CONTINUE" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  userWait() {
    this.setState({ signUpResult: "WAIT" });
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
        <Container>
          <Wrapper>
            <TitleWrapper>
              <Title>Thanks for signing up with Open Mentorship!</Title>
            </TitleWrapper>
            <BodyText>
              Please read through these steps, and indicate whether you want to
              continue with the process or wait until you’re ready for a
              matching session.
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
                  After that period, the mentors will recieve their requests,
                  and will have one week to decide on who they want to work
                  with.
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
        </Container>
      ),
    }[this.state.signUpResult];
  }
}
