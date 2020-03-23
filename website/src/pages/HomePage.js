import React from 'react'
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
  height: 600px;
  min-height: 400px;
  width: 100%;
  background: #161415 url(../images/header-background.jpg) no-repeat top center;
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
`

const HomePage = () => {
  return(
    <Body>
      <MainCaption>
          <Caption>
              Openmentorship
          </Caption>
      </MainCaption>
    </Body>
  )
}

export default HomePage