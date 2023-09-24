import React from "react";

import {
  Button,
  Wrapper,
  MailPicture,
  HumansPicture,
  PenPaperPicture,
  MagnifyPicture,
  HandShakePicture,
  ThumbsUpPicture,
  ButtonText,
  ContentWrapper,
  ButtonWrapper,
  WaitTitle,
  WaitText,
} from "../postRegistration/PostRegistrationStyling";

import { Container, TitleWrapper } from "../../../components";

import { makeStyles } from "@material-ui/core/styles";

import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "71px",
  },
  heading: {
    fontSize: "35px",
    fontWeight: 400,
    lineHeight: "50px",
    letterSpacing: "0em",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px",
      lineHeight: "40px",
    },
  },
  contentWrapper: {
    // marginTop: "61px",
    height: "auto",
  },
  pictureTextWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "61px",
  },
  pictureText: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "40px",
    letterSpacing: "0em",
    textAlign: "center",
    marginTop: "6px",
  },
}));

const PostRegister = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper}>
      <Wrapper>
        <TitleWrapper>
          <Typography className={classes.heading}>
            Thanks for signing up with Open Mentorship! Here is how you make a
            connection...
          </Typography>
        </TitleWrapper>

        <ContentWrapper className={classes.contentWrapper}>
          <Box className={classes.pictureTextWrapper}>
            <MailPicture />
            <Typography className={classes.pictureText}>
              {props.emailText}
            </Typography>
          </Box>

          <Box className={classes.pictureTextWrapper}>
            <HumansPicture alt="" />
            <Typography className={classes.pictureText}>
              {props.findText}
            </Typography>
          </Box>

          {props.requestText ? (
            <Box className={classes.pictureTextWrapper}>
              <PenPaperPicture alt="" />
              <Typography className={classes.pictureText}>
                {props.requestText}
              </Typography>
            </Box>
          ) : (
            ""
          )}

          <Box className={classes.pictureTextWrapper}>
            <MagnifyPicture alt="" />
            <Typography className={classes.pictureText}>
              {props.searchText}
            </Typography>
          </Box>

          <Box className={classes.pictureTextWrapper}>
            <HandShakePicture alt="" />
            <Typography className={classes.pictureText}>
              {props.connectText}
            </Typography>
          </Box>
        </ContentWrapper>

        <ButtonWrapper>
          <Button onClick={props.userContinue}>
            <ButtonText>Got It!</ButtonText>
          </Button>
          {/* <Button wait onClick={userWait}>
          <ButtonText wait>I'm going to wait.</ButtonText>
        </Button> */}
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default PostRegister;
