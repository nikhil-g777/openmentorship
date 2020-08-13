import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <Link to="/register">
      <Button variant="contained" color="primary">
        SIGN UP
      </Button>
    </Link>
  )
}

export default SignUp