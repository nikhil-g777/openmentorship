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

const buttonStyle = {
  background: 'white',
  border: 'none'
}

const RegisterMain = (props) => {
  const classes = useStyles();

  const [user, setUser] = useContext(UserContext);

  const [showUserFields, setShowUserFields] = useState(false);
  const [ state, setState ] = useState({
    firstName:"",
    lastName: "",
    email: "",
    headline: "",
    bio: ""
  })
  const [disabled, setDisabled] = useState(false);
  const [ emptyFieldError, setEmptyFieldError ] = useState(false)


  const continueStep = (e) => {
    let inputIsValid = validateInput();
    if(inputIsValid) {
      props.handleNext();
    } else {
      setEmptyFieldError(true);
    }
  };

  const handleSuccess = (data) => {
    registerUser({
      authCode: data.code,
      type: 'linkedInSignup'
    })
      .then((response) => {
        setUser({
          _id: response.data._id,
          userType: response.data.userType,
          token: response.data.token
        });
        setState((prevState) => ({
          ...prevState,
          firstName:response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,        
        }))
        setDisabled(true);
        localStorage.setItem('token', JSON.stringify(response.data.token));
      })
      .catch((error) => {
        console.log(error);
      });
    setShowUserFields(true);
  };

  const handleFailure = (error) => {};

   const validateInput = () => {
    if(state.firstName.length === 0 || state.lastName.length === 0 || state.email.length === 0 || state.headline.length === 0 || state.bio.length === 0) {
      console.log('INVALID');
      setEmptyFieldError(true)
      return false;
    }
    return true;
  }
  const handleInput = (e) => {
    setEmptyFieldError(false)
    let { value, name } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]:value
    }))
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
              value={state.firstName}
              onChange={handleInput}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleInput}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              type="email"
              name="email"
              value={state.email}
              onChange={handleInput}
            />
            <TextField
              id="outlined-basic"
              label="*Headline"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="headline"
              value={state.headline}
              onChange={handleInput}
              placeholder="Software Engineer at Google"
            />
            <TextField
              multiline
              id="outlined-basic"
              label="*Bio"
              variant="outlined"
              fullWidth={true}
              type="text"
              name="bio"
              value={state.bio}
              onChange={handleInput}
              placeholder="Passionate about FullStack Development and Entrepreneurship"
            />
          </form>
        )}
        {emptyFieldError && <p>Fields can't be blank</p>}
        <Button onClick={continueStep} disabled={!showUserFields}>
          Continue
        </Button>
      </Container>
    </>
  );
};

export default RegisterMain;
