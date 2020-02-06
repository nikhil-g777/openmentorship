
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { NavBar } from '../components'
import { CreateMentee, CreateMentor } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

const Body = styled.div.attrs({
    className: 'container-fluid'
})`
    padding: 0;
`

const MainCaption = styled.div.attrs({
    className: 'row'
})`
    margin: 0;
    color: white;    
    position: relative;
    height: 600px;
    min-height: 400px;
    width: 100%;
    background: #161415 url(../images/header-background.jpg) no-repeat top center;
    background-size: cover !important;
    -webkit-background-size: cover !important;
    text-align: center;
    overflow: hidden;
`

const Caption = styled.div.attrs({})`
    display: inline-block;
    margin: 0 auto;
    vertical-align: middke;
`

function App() {
    return (
        <div>
        <Router>
            <NavBar />
            <Switch>
              <Route path='/mentees/create' exact component={CreateMentee} />
              <Route path='/mentors/create' exact component={CreateMentor} />
            </Switch>
        </Router>
            <Body>
                <MainCaption>
                    <Caption>
                        Openmentorship
                    </Caption>
                </MainCaption>
            </Body>
        </div>
    )
}

export default App