import React, { useState, useEffect } from "react";

import { LinkedIn } from "react-linkedin-login-oauth2";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import { registerUser, getUserInfo } from "../../redux/Actions/UserActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "2rm",
    "& > *": {
      margin: "2rem 0",
    },
  },
  registerBackground: {
    transform: "scaleX(-1)",
  },
  textField: {
    style: {
      margin: "1rem 1rem",
    },
  },
  continueButton: {
    backgroundColor: "#51B6A5",
    borderRadius: "40px",
    textTransform: "none",
    width: "75%",
  },
  link: {
    color: "inherit",
  },
  textField: {
    "& .Mui-disabled": {
      background: "#f5f5f5",
    },
  },
}));

const RootContainer = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  display: none;
  overflow: hidden;
  @media (min-width: 768px) {
    display: block;
    width: 50vw;
  }
`;
const FormContainer = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media (min-width: 768px) {
    width: 50vw;
  }
`;
const Title = styled.div`
  text-align: left;
  font-size: 2rem;
`;
const Info = styled.p`
  padding: 1em 0 1em 0;
`;

const LindkedInButton = styled.img`
  width: 200px;
  text-alignl: left;
`;

const NameContainer = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 1rem 0 1rem 0;
`;

const SubmitContainer = styled.div`
  display: flex;
`;
const ContinueDiv = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  width: 50%;
  text-align: center;
`;

const ExistingUser = styled.div`
  color: "#6D6D6D";
  width: 50%;
  text-align: center;
`;

const buttonStyle = {
  background: "white",
  border: "none",
};

const RegisterMain = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [user, setUser] = useContext(UserContext);
  const user = useSelector((store) => store.userreducer.user);

  const [showUserFields, setShowUserFields] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");



  const [localState, setLocalState] = useState({
    firstName: props.values.firstName,
    lastName: props.values.lastName,
    email: props.values.email,
    headline: props.values.headline,
    bio: props.values.bio,
  });
  const [disabled, setDisabled] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  useEffect(() => {
    setLocalState((prevState) => ({
      ...prevState,
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
    }));
  }, [user]);

  const continueStep = (e) => {
    let inputIsValid = validateInput();
    if (inputIsValid) {
      props.handleNext();
    } else {
      setEmptyFieldError(true);
    }
  };

  const handleSuccess = async (data) => {
    await dispatch(
      registerUser({
        authCode: data.code,
        type: "linkedInSignup",
      })
    );
    setDisabled(true);
    setErrorMessage("Connected successfully")
    setSeverity("success")
    setOpen(true);

    if (Object.keys(user).length === 0) {
      await dispatch(getUserInfo());
    }
    // setLocalState((prevState) => ({
    //   ...prevState,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    // }));
    // .then((response) => {
    //   setUser({
    //     _id: response.data._id,
    //     userType: response.data.userType,
    //     token: response.data.token,
    //   });
    //   setLocalState((prevState) => ({
    //     ...prevState,
    //     firstName: response.data.user.firstName,
    //     lastName: response.data.user.lastName,
    //     email: response.data.user.email,
    //   }));
    //   setDisabled(true);
    //   localStorage.setItem("token", JSON.stringify(response.data.token));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    setShowUserFields(true);
  };

  const handleFailure = (error) => {
    console.log(error);
    setErrorMessage(error.errorMessage)
    setSeverity("error")

    setOpen(true);
  };

  const validateInput = () => {
    if (
      localState.firstName?.length === 0 ||
      localState.lastName?.length === 0 ||
      localState.email?.length === 0 ||
      localState.headline?.length === 0 ||
      localState.bio?.length === 0
    ) {
      console.log("INVALID");
      setEmptyFieldError(true);
      return false;
    }
    return true;
  };
  const handleInput = (e) => {
    setEmptyFieldError(false);
    let { value, name } = e.target;
    setLocalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    props.handleInput(e);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity={severity}>
         {errorMessage}
        </Alert>
      </Snackbar>
      <RootContainer>
        <ImageContainer>
          <img
            className={classes.registerBackground}
            src="/images/registerBackground.png"
            alt=""
          />
        </ImageContainer>

        <FormContainer>
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
                <button
                  onClick={onClick}
                  disabled={disabled}
                  style={buttonStyle}
                >
                  <LindkedInButton src="/images/linkedin_connect_button.png" />
                </button>
              )}
            />
          </Wrapper>
          {showUserFields && (
            <form className={classes.root}>
              <NameContainer>
                <TextField
                  disabled
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  className={classes.textField}
                  fullWidth={true}
                  type="text"
                  name="firstName"
                  value={localState.firstName || ""}
                  onChange={handleInput}
                  style={{
                    marginRight: "1rem",
                    marginBottom: 0,
                  }}
                />
                <TextField
                  disabled
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  className={classes.textField}
                  fullWidth={true}
                  type="text"
                  name="lastName"
                  value={localState.lastName || ""}
                  onChange={handleInput}
                  style={{
                    marginRight: "1rem",
                    marginBottom: 0,
                  }}
                />
              </NameContainer>
              <TextField
                disabled
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={classes.textField}
                fullWidth={true}
                type="email"
                name="email"
                value={localState.email || ""}
                onChange={handleInput}
              />
              <TextField
                disabled={user && Object.keys(user).length === 0 ? true : false}
                id="outlined-basic"
                label="*Headline"
                variant="outlined"
                className={classes.textField}
                fullWidth={true}
                type="text"
                name="headline"
                value={localState.headline || ""}
                onChange={handleInput}
                placeholder="Software Engineer at Google"
              />
              <TextField
                disabled={user && Object.keys(user).length === 0 ? true : false}
                multiline
                id="outlined-basic"
                label="*Bio"
                variant="outlined"
                className={classes.textField}
                fullWidth={true}
                type="text"
                name="bio"
                value={localState.bio || ""}
                onChange={handleInput}
                placeholder="Passionate about FullStack Development and Entrepreneurship"
              />
            </form>
          )}
          {emptyFieldError && <p>Please fill the required fields</p>}
          <SubmitContainer>
            <ExistingUser>
              <a href="/" className={classes.link}>
                <u>Already have an account?</u>
              </a>
            </ExistingUser>
            <ContinueDiv>
              <Button
                variant="contained"
                onClick={continueStep}
                disabled={
                  !showUserFields || (user && Object.keys(user).length === 0)
                    ? true
                    : false
                }
                className={classes.continueButton}
              >
                Continue
              </Button>
            </ContinueDiv>
          </SubmitContainer>
        </FormContainer>
      </RootContainer>
    </>
  );
};

export default RegisterMain;
