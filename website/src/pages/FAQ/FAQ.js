import React, { Component } from 'react';
import styled from 'styled-components'
import Title from './elements/Title'
import Content from './elements/Content'




class FAQ extends Component {
    
    render() { 
        return ( 
        <React.Fragment>
           <Title/>
           <Content/>
        </React.Fragment> 
        );
    }
}
 
export default FAQ;