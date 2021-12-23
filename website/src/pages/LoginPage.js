import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Container, Title, Menu } from "../components";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn } from "react-linkedin-login-oauth2";

// import { loginUser } from "../api";
import { loginUser } from "../../src/redux/Actions/UserActions";
// import { useAuth } from "../context/auth";
// import { UserContext } from "../context/UserContext";

import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isError, setIsError] = useState(false);
  // const [user, setUser] = useContext(UserContext);

  const user = useSelector((store) => store.userreducer.user);

  // const { setAuthTokens } = useAuth();

  // store the page where user wanted to go and redirect to that page after login
  const referrer =
    props.location.state && props.location.referrer != "/login"
      ? props.location.state.referrer
      : "/sessions";

  console.log(referrer);
  const handleSuccess = async (data) => {
    await dispatch(loginUser({ authCode: data.code }));
    // .then((response) => {
    //   if (response.data.success) {
    //     setUser({
    //       _id: response.data.user._id,
    //       userType: response.data.user.userType,
    //       token: response.data.token,
    //     });
    //     localStorage.setItem("token", JSON.stringify(response.data.token));
    //   } else {
    //     setIsError(true);
    //   }
    // })
    // .catch((error) => {
    //   setIsError(true);
    //   console.log(error, "error");
    // });
  };

  const handleFailure = (error) => {
    console.log(error);
    setIsError(true);
  };

  if (user.token) {
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
