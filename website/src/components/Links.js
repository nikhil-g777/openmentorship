import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
                            <Link to="/mentees/create" className="nav-link">
                                Register as Menteee
                            </Link>
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