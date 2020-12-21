import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Title, Menu } from "../components";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn } from "react-linkedin-login-oauth2";

import { loginUser } from "../api";
import { useAuth } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
    "& > *": {
      margin: "1em 0",
    },
  },
}));

const Info = styled.p`
  padding: 1em 3em 1em 3em;
`;

const LindkedInButton = styled.img`
  width: 200px;
`;

const Wrapper = styled.div`
  margin: 3em auto;
`;

const Login = (props) => {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const { setAuthTokens } = useAuth();

  // store the page where user wanted to go and redirect to that page after login
  const referrer = props.location.state
    ? props.location.state.referrer
    : "/postRegistration";
  // const referrer = '/';

  const handleSuccess = (data) => {
    loginUser({
      authCode: data.code,
    })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("userType", response.data.user.userType);
          setAuthTokens(response.data.token);
          setLoggedIn(true);
          // redirect to matches for now
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  const handleFailure = (error) => {
    console.log(error);
    setIsError(true);
  };

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <Title>Open Mentorship</Title>
        <Info>Find a Mentor who can help guide you to success.</Info>
        <Wrapper>
          <LinkedIn
            clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
            onFailure={handleFailure}
            onSuccess={handleSuccess}
            redirectUri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
            scope="r_emailaddress r_liteprofile"
            redirectPath="/"
          >
            <LindkedInButton src="/images/linkedin-button.png" />
          </LinkedIn>
          {isError && <p> Could not authenticate with Linkedin</p>}
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
