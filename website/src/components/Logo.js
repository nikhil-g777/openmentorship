import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand'
})``

class Logo extends Component{
    render(){
        return (
            <Wrapper>
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="50" height="50" alt="www.openmentorship.com" />
                    OpenMentorShip
                </Link>
            </Wrapper>
        )
    }
}

export default Logo