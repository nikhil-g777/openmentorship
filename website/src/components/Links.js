import React, { Component } from 'react'
import { Link, Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import CreateMentee from "../pages/CreateMentee"

const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse '
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto'
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>

                <Link to="/" className="navbar-brand">
                    OpenMentorShip
                </Link>
                <Collapse>
                    <List>
                        <Item>
                                <CreateMentee className="nav-link">
                                    Register as Mentee
                                </CreateMentee>
                        </Item>
                        <Item>
                            <Link to="/mentors/create" className="nav-link">
                                Register as Mentor
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/FAQ" className="nav-link">
                                FAQ
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links