import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = props => {
  return (
    <ArrowBackIosIcon onClick={props.handleBack}/>
  )
}
export default BackButton