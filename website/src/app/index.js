
import React from 'react'
import { FAQ, Home, RegisterForm,MentorMatches, LandingPage } from '../pages'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2'

import { theme }  from "./GlobalTheme"

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/FAQ" exact component={FAQ}/>
            <Route exact path='/linkedin' component={LinkedInPopUp} />
            {/* each route below needs to import their own Menu component. 
            ...See mentorMatches for example  */}
            <Route path='chat' component={"#"} />
            <Route path='/mentorMatches' component={MentorMatches} />
            <Route path='/profile' component={"#"} />
            <Route path="/register" component={RegisterForm} />
            <Route path='/signin' component={"#"} />
          </Switch>
        </ThemeProvider>
      </Router>
    </>
  )
};

export default App;