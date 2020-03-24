import React, { Component } from 'react';
import styled from 'styled-components'

const SectionFAQ = styled.section`
    display:flex !important;
    justify-content: center;
    background: rgba(0,0,0,.1);
`


const ContentBoxContainerParagraph = styled.p `
    opacity: 0;
    height: 0;
    transition: opacity .5s ease, height .5s ease;
`

const ContentBoxContainer = styled.div `
    margin:20px 0;
    transition: .5s ease;
    padding: 10px 0 10px 10px;
    background:white;
    &:hover{
        box-shadow: 4px 3px 5px 2px black;
        ${ContentBoxContainerParagraph} {
            height: 30px;
            opacity: 1;
        }
    }
`
const ContentBoxTitle = styled.div `
    margin:0;
    align-content: center;
    text-transform: uppercase;
`

const ContentBoxContainerTitle = styled.div ``


class Content extends Component {

    render() { 
        return ( 
            <SectionFAQ>
           <div>
                        <ContentBoxTitle>
                            <p>
                                Questions
                            </p>
                        </ContentBoxTitle>

                        <ContentBoxContainer>
                            <ContentBoxContainerTitle>
                                <h2>Who is this platform for ?</h2>
                            </ContentBoxContainerTitle>
                            <ContentBoxContainerParagraph>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </ContentBoxContainerParagraph>  
                        </ContentBoxContainer>         
                        <ContentBoxContainer>
                            <ContentBoxContainerTitle>
                                <h2>What type of help can I expect from a Mentor ?</h2>                    
                            </ContentBoxContainerTitle>
                               
                            <ContentBoxContainerParagraph>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </ContentBoxContainerParagraph>
                        </ContentBoxContainer>
                       <ContentBoxContainer>          
                            <ContentBoxContainerTitle>
                                <h2>How do I get in touch to collaborate and be part of the project ?</h2>
                            </ContentBoxContainerTitle>
                            <ContentBoxContainerParagraph>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </ContentBoxContainerParagraph>
                        </ContentBoxContainer> 
                       
                        <ContentBoxContainer>
                            <ContentBoxContainerTitle>
                                <h2>Q4</h2>
                            </ContentBoxContainerTitle>     
                            <ContentBoxContainerParagraph>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </ContentBoxContainerParagraph> 
                        </ContentBoxContainer>
                        
                        <ContentBoxContainer>
                            <ContentBoxContainerTitle>
                                <h2>Q5</h2>
                            </ContentBoxContainerTitle>
                            <ContentBoxContainerParagraph>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </ContentBoxContainerParagraph>
                        </ContentBoxContainer>
                </div>
            </SectionFAQ>
         );
    }
}
 
export default Content;