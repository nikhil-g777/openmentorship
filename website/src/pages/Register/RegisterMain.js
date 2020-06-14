import React, { useState } from 'react'
import PlaceholderLogo from '../../logo.svg'

import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom:"1em",
    '& > *': {
      margin: '1em 0',
    },
  },
}));

const Container = styled.div`
  width:90%;
  max-width:500px;
  margin:0 auto;
  text-align:center;
  padding-top:2em;

  h3 {
    padding-top:.5em;
  }
  p {
    padding:1em 3em 1em 3em;
  }
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
const RegisterMain = () => {
  const [ state, setState ] = useState({
    name: "",
    email: "",
    password: ""
  })

  const classes = useStyles();
  const history = useHistory();

  const handleInput = e => {
    const { name, value } = e.target
    setState({ ...state, [name]:value})
  }
  const handleRegisterUser = () => {
    if(!state.name || !state.email || !state.password){
      alert("fill out all fields plz")
    }else {
      //api call --> if success, redirect to registerFlow
    } 
  }
  return (
    <Container>
      <img src={PlaceholderLogo} style={{height:50}} alt="open mentorship logo"/>
      <h3>Open Mentorship</h3>
      <p>Find a Mentor who can help guide you to success.</p>
      <button>Sign In with LinkedIn</button>
      <Divider>or</Divider>
      <form className={classes.root}>
        <TextField 
          id="outlined-basic" 
          label="Full Name" 
          variant="outlined" 
          fullWidth={true}
          type="text"
          name="name"
          onChange={handleInput}
        />
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          fullWidth={true}
          type="email"
          name="email"
          onChange={handleInput}
        />
        <TextField 
          id="outlined-basic" 
          label="Password" 
          variant="outlined" 
          fullWidth={true}
          type="password"
          name="password"
          onChange={handleInput}
        />
      </form>
      <Button onClick={handleRegisterUser}>Continue</Button>
    </Container>
  )
}

export default RegisterMain