import React from 'react'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

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
  height: 693px;
  min-height: 400px;
  width: 100%;
  background: #161415 url(../images/header-background.jpg) no-repeat center;
  background-size: cover !important;
  -webkit-background-size: cover !important;
  text-align: center;
  overflow: hidden;
`

const Caption = styled.div.attrs({
  className: 'text-center'
})`
  display: inline-block;
  margin: 0 auto;
  vertical-align: middle;
  width:71%;
  padding-top:60px;
`

const CaptionTitle = styled.h1`
  font-size:100px;
  color: #fff;
  letter-spacing: -2px;
  margin: 0 auto 18px auto;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, .8);
`

const CaptionDescription = styled.h3`
  font-size:20px;
  font-family:serif;
  line-height: 30px;
  width:63%;
  margin:0 auto;
  color: #A8A8A8;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, .5);
`
const LineBreak = styled.hr`
  width: 55%;
  margin: 18px auto 24px auto;
  border-color: rgba(150, 150, 150, .1);
`

const GithubButtonContainer = styled.div`
  margin: 24px 0;
  padding: 0;
  font-size: 30px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, .8);
  color: #fff;
}


`
const HomePage = () => {
  return(
    <Body>
      <MainCaption>
          <Caption>
            <CaptionTitle>OpenMentorship.</CaptionTitle>
            <CaptionDescription><span style={{color:'white'}}>Smart Work is more valuable than Hard Work!</span> With the help of this open source project, Find a Mentor who can guide you to success. We are still in the initial development phase of the platform and if you are intersted in contributing towards project, mentoring or looking for a mentor, please send an email to nikhil.g777@gmail.com.</CaptionDescription>
            <LineBreak></LineBreak>
            <GithubButtonContainer>
              <a style={{color:"white"}}href="https://github.com/nikhil-g777/openmentorship" target="_blank"><FontAwesomeIcon icon={faGithub}/></a> 
            </GithubButtonContainer>
          </Caption>
      </MainCaption>
    </Body>
  )
}

export default HomePage