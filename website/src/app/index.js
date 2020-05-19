
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2'

import { NavBar } from '../components'
import { CreateMentee, CreateMentor, FAQ, Home } from '../pages'


import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div>
        <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path='/mentees/create' component={CreateMentee} />
              <Route path='/mentors/create' component={CreateMentor} />
              <Route exact path='/linkedin' component={LinkedInPopUp} />
              <Route path="/FAQ" exact component={FAQ}/>
            </Switch>
        </Router>
        </div>
    )
};

export default App;