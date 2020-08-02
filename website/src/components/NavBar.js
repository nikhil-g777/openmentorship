import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import Links from './Links'
import SignUp from './SignUp'

const Container = styled.div.attrs({
    className: 'container-fluid',
})`
    padding: 0;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
    @media (max-width: 768px){ 
    display: none!important }
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                    <SignUp />
                </Nav>
            </Container>
        )
    }
}

export default NavBar