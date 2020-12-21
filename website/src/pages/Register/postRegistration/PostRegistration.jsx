import React, { useContext, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
import { Container, TitleWrapper, Title } from "../../../components";

import { updateUser } from "../../../api";
import { UserContext } from "../../../context/UserContext";

const PostRegistration = (props) => {

  const [signUpResult, setSignUpResult] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [userData, setUserData] = useState(this.props.data);

  const userContinue = () => {
    updateUser({
      _id: user._id,
      user: {
        active: true,
      },
    })
      .then((response) => {
        setSignUpResult('CONTINUE')
        this.props.history.push("/sessions");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const userWait = () => {
    setSignUpResult('WAIT')
  }

  const renderComponent = (param) => {
    switch (param) {
      case 'CONTINUE':
        return (
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
        )

      case 'WAIT':
        return (
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
        )

      default:
        return (
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
                <Button onClick={userContinue}>
                  <ButtonText>I'm In!</ButtonText>
                </Button>
                <Button wait onClick={userWait}>
                  <ButtonText wait>I'm going to wait.</ButtonText>
                </Button>
              </ButtonWrapper>
            </Wrapper>
          </Container>
        )
    }
  }

  return (
    <div>
      {renderComponent(signUpResult)}
    </div>
  );
}

export default withRouter(PostRegistration);
