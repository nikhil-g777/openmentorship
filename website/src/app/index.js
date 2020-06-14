
import React from 'react'
import { CreateMentee, CreateMentor, FAQ, Home, RegisterMain } from '../pages'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'

import { theme }  from "./GlobalTheme"

function App() {
  return (
      <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/mentees/create' component={CreateMentee} />
            <Route path='/mentors/create' component={CreateMentor} />
            <Route path="/FAQ" exact component={FAQ}/>
            <Route path="/register" component={RegisterMain} />
          </Switch>
        </ThemeProvider>
      </Router>
      </>
  )
};

export default App;