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
  const [linkedInId, setLinkedInId] = useState("");

  const continueStep = (e) => {
    registerUser({
      authCode: linkedInId,
      user: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        headline: headline,
        bio: bio,
        linkedInId: linkedInId,
      },
    })
      .then((response) => {
        setUser({
          _id: response.data._id,
          userType: response.data.userType,
          token: response.data.token
        });
        localStorage.setItem('token', JSON.stringify(response.data.token));
        props.handleNext();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuccess = (data) => {
    setShowUserFields(true);
    setLinkedInId(data.code);
  };

  const handleFailure = (error) => {};

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
          >
            <LindkedInButton src="/images/linkedin-button.png" />
          </LinkedIn>
        </Wrapper>
        {showUserFields && (
          <form className={classes.root}>
            <TextField
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
              label="Headline"
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
              label="Bio"
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
