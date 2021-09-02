import React, { useContext, useState } from "react";
import { Container, Title, Menu } from "../../components";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn } from "react-linkedin-login-oauth2";

import { registerUser } from "../../api";
import RegisterStep1 from "./RegisterStep1";
import { useAuth } from "../../context/auth";
import { UserContext } from "../../context/UserContext";

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

const RegisterMain = (props) => {
  const classes = useStyles();

  const [user, setUser] = useContext(UserContext);

  const [showUserFields, setShowUserFields] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [disabled, setDisabled] = useState(false);

  const continueStep = (e) => {
    props.handleNext();
  };

  const handleSuccess = (data) => {
    registerUser({
      authCode: data.code,
      type: "linkedInSignup",
    })
      .then((response) => {
        setUser({
          _id: response.data._id,
          userType: response.data.userType,
          token: response.data.token,
        });
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setEmail(response.data.user.email);
        setDisabled(true);
        localStorage.setItem("token", JSON.stringify(response.data.token));
      })
      .catch((error) => {
        console.log(error);
      });

    setShowUserFields(true);
  };

  const handleFailure = (error) => {};
  const buttonStyle = {
    background: "white",
    border: "none",
  };

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
            redirectPath="/register"
            disabled={disabled}
            renderElement={({ onClick, disabled }) => (
              <button onClick={onClick} disabled={disabled} style={buttonStyle}>
                <LindkedInButton src="/images/linkedin_connect_button.png" />
              </button>
            )}
          />
        </Wrapper>
        {showUserFields && (
          <form className={classes.root}>
            <TextField
              disabled
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="*Headline"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <TextField
              multiline
              id="outlined-basic"
              label="*Bio"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </form>
        )}
        <Button onClick={continueStep} disabled={!showUserFields}>
          Continue
        </Button>
      </Container>
    </>
  );
};

export default RegisterMain;
