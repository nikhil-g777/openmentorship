import React from 'react'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const Body = styled.div.attrs({
  className: 'container-fluid'
})`
  padding: 0;
  text-align:center;
  line-height:30px;
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
`

const SlideImageSection = styled.div`
  background: rgb(136, 134, 128) no-repeat center center;
  background-size: cover !important;
  -webkit-background-size: cover !important;
  background-attachment: fixed;
  position: relative;
  min-height: 300px;
  width: 100%;
  overflow: hidden;
`
const SlideImageWrapper = styled.div`
  position: relative;
  margin: 20px;
  width: 100%;
  overflow: hidden;
`
const InformationSection = styled.div`
  height:400px;
  background: #fff;
  padding-top: 90px;
  padding-bottom: 72px;
  overflow: hidden;
`

const InformationHeader = styled.h3`
  font-size:25px;
  color:black;
`

const InformationWrapper = styled.div`
  width:65%;
  margin: 0 auto;
  color:#838C95;
  padding-bottom:30px;
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
      <SlideImageSection>
        <SlideImageWrapper>
          <img style={{maxWidth: '100', height: 'auto'}} src="/images/mentoring_advantages.jpg"/>
        </SlideImageWrapper>
      </SlideImageSection>
      <InformationSection>
        <InformationWrapper>
          <InformationHeader>Importance</InformationHeader>
          <p>In this world of rapidly advancing technologies and developments, it is very important to stay up to date and keep learning. Be it college students or young professionals, we are often confused anout what courses to take and what skills to acquire. This is where mentorship plays a big role and people with experience in the industry have a much better understanding and can greatly help in guiding and advising mentees in their careers</p>
        </InformationWrapper>
        <LineBreak></LineBreak>
      </InformationSection>
      <SlideImageSection>
        <SlideImageWrapper>
          <img style={{maxWidth: '100', height: 'auto'}} src="/images/steps.jpg"/>
        </SlideImageWrapper>
      </SlideImageSection>
    </Body>
  )
}

export default HomePage