import React, { useState } from 'react'
import PlaceholderLogo from '../../logo.svg'
import { Container, Title } from "../../components"
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

const Divider = styled.div`
  padding: 2em 0 1em 0;
  display:flex;
  justify-content:center;
  align-items: center;
  color:grey;

  &:after,
  &:before {
    content: "";
    display: block;
    background: #ccc;
    width: 90%;
    height:1px;
    margin: 0 10px;
  }
`

const LindkedInButton = styled.img`
  width:200px;

`

const RegisterMain = props => {
  const classes = useStyles();
  const [ userRegistered, setUserRegistered ] = useState(false)

  const continueStep = e => {
    if(!props.values.name || !props.values.email || !props.values.password){
      alert("fill out all fields plz")
    }else {
      //api call to register user with no LinkedIn
      props.handleNext()
    } 
  }

  const handleSuccess = (data) => {
    console.log(data.code)
    registerUser({
      authCode: data.code
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      // setUserRegistered(true)
      props.handleNext()
      console.log(error);
    })
  }

  const handleFailure = (error) => {
  }
  
  return (
    <>
    <Container style={{ textAlign: "center" }}>
      <img src={PlaceholderLogo} style={{ height: 80 }} alt="open mentorship logo" />
      <Title>Open Mentorship</Title>
      <Info>Find a Mentor who can help guide you to success.</Info>
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

      <Divider>or</Divider>
      <form className={classes.root}>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          fullWidth={true}
          type="text"
          name="name"
          defaultValue={props.values.name}
          onChange={props.handleInput}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth={true}
          type="email"
          name="email"
          defaultValue={props.values.email}
          onChange={props.handleInput}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth={true}
          type="password"
          name="password"
          defaultValue={props.values.password}
          onChange={props.handleInput}
        />
      </form>
      <Button onClick={continueStep}>Continue</Button>
    </Container>
  </>
  )
}

export default RegisterMain