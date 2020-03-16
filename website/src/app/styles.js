import styled from 'styled-components'


export const Body = styled.div.attrs({
    className: 'container-fluid'
})`
    padding: 0;
`

export const MainCaption = styled.p.attrs({
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
    display:flex;
    justify-content:center;
    flex-direction: column;

`
export const LandingCaption = styled.p.attrs({})`
display:flex;
justify-content:flex-center;
align-content:center;
flex-direction:column;
text-align:left;
text-justify:inter-character;

margin-left:30px;
max-width:650px;
min-width:400px;
max-height:400px;
`

export const Caption = styled.p.attrs({})`
    
    margin: 0;
    vertical-align: middle;
    font-size: 65px;
    font-weight: 700;
    font-family: Segoe UI;
    width:100%;
`


export const Caption2 = styled.p.attrs({})`
font-family: Segoe UI;
width:100%;

`

export const Smart_Sentence = styled.p.attrs({})`
    font-size:24px;
    
`
export const Smart_Work = styled.span.attrs({})`
    font-size:48px;
`
export const Mentor = styled.span.attrs({})`
    color:#45709C;
    font-size:24px;
    font-style:italic;
`
export const Email = styled.p.attrs({})`
    font-weight:600;
`
