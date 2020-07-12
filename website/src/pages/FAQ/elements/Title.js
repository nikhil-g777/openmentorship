import React, { Component } from 'react';
import styled from 'styled-components'

const SectionFAQ = styled.section`
    display:flex !important;
    justify-content: center;
    background: rgba(0,0,0,.1);
`

const FAQbox = styled.section`
    display: flex;
    justify-content:center;
    align-items: center;
    height:200px;
    background: #9198e5;
    width:100%;
    color:white;
    `
export default class Title extends Component{

    render(){
        return(
            <SectionFAQ>
                <FAQbox>
                    <h1>FAQ</h1>
                </FAQbox>                
             </SectionFAQ>
        )
    }
    
}
