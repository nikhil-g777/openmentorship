import React, { useState } from 'react'
import { Container, Title, Menu} from "../../components"
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { LinkedIn } from 'react-linkedin-login-oauth2';

import { registerUser } from '../../api';
import RegisterStep1 from './RegisterStep1';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
    '& > *': {
      margin: '1em 0',
    },
  },
}));

const Info = styled.p`
  padding:1em 3em 1em 3em;
`

const LindkedInButton = styled.img`
  width:200px;
`

const Wrapper = styled.div`
  margin:3em auto;
`

const RegisterMain = props => {
  const classes = useStyles();
  const [ showUserFields, setShowUserFields ] = useState(false)
  // const [ firstName, setFirstName ] = useState("")
  // const [ email, setEmail ] = useState("")
  // const [ lastName, setLastName ] = useState("")
  // const [ headline, setHeadline ] = useState("")
  // const [ bio, setBio ] = useState("")
  const [ linkedInId, setLinkedInId ] = useState("")
  const [ state, setState ] = useState({
    firstName:"",
    lastName: "",
    email: "",
    headline: "",
    bio: ""
  })
  const [ emptyFieldError, setEmptyFieldError ] = useState(false)

  const continueStep = e => {
    let inputIsValid = validateInput();
    if(inputIsValid) {
      registerUser({
          "authCode": linkedInId,
          "user": {
            "firstName": state.firstName,
            "lastName": state.lastName,
            "email": state.email,
            "headline": state.headline,
            "bio": state.bio,
            "linkedInId": linkedInId
          }
      }).then((response) => {
        localStorage.setItem("userId", response.data._id)
        props.handleNext()
      }).catch((error) => {
        console.log(error);
      })
    }
  } 

  const handleSuccess = (data) => {
    setShowUserFields(true)
    setLinkedInId(data.code)
  }

  const handleFailure = (error) => {
  }

  const validateInput = () => {
    let inputValid = true;
    if(state.firstName.length === 0 || state.lastName.length === 0 || state.email.length === 0 || state.headline.length === 0 || state.bio.length === 0) {
      setEmptyFieldError(true)
      inputValid = false;
    }
    return inputValid;
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
          scope='r_emailaddress r_liteprofile'
          redirectPath='/register'
        >
          <LindkedInButton src='/images/linkedin-button.png' />
        </LinkedIn>
      </Wrapper>
      {showUserFields && 
        <form className={classes.root}>
          <TextField
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
            label="Headline"
            variant="outlined"
            fullWidth={true}
            type="text"
            name="headline"
            value={state.headline}
            onChange={handleInput}
          />
          <TextField
            multiline
            id="outlined-basic"
            label="Bio"
            variant="outlined"
            fullWidth={true}
            type="text"
            name="bio"
            value={state.bio}
            onChange={handleInput}
          />
        </form>   
      }
      {emptyFieldError && <p>Fields can't be blank</p>}
      <Button onClick={continueStep} disabled={!showUserFields}>Continue</Button>
    </Container>
  </>
  )
}

export default RegisterMain