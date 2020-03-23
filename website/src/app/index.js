
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { CreateMentee, CreateMentor, HomePage } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path='/mentees/create' exact component={CreateMentee} />
                <Route path='/mentors/create' exact component={CreateMentor} />
            </Switch>
        </Router>
    )
}

export default App