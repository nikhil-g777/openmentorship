import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <Link to="/register">
      <Button variant="contained" color="primary">
        Sign Up
      </Button>
    </Link>
  )
}

export default SignUp