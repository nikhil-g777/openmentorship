import React, { useState } from 'react'
import { Container, DotStepper, FormItem, Title, TitleWrapper } from "../../components"
import { BootstrapInput } from "../../app/GlobalTheme"

import { FormControl, FormControlLabel, Checkbox, Input, InputBase, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import styled from 'styled-components'

const FlexWrapper = styled.div`
  display:flex;
  justify-content: space-between;
`

const FlexItem = styled.div`
  width:33%;
`

const RegisterStep2 = props => {
  const [ checkbox, setCheckbox ] = useState(props.values.currentRole)

  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked)
    props.handleCheckbox(event)
  }

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]
  
  return ( 
    <Container>
      <TitleWrapper>
        <Title>Work Experience</Title>
      </TitleWrapper>
      <FormItem>
        <h6 style={{fontWeight:'600', marginTop:"2em"}}>Work Experience</h6>
        <InputLabel>Job Title</InputLabel>
        <TextField 
          variant="outlined" 
          fullWidth={true}
          type="text"
          className="jobTitle"
          name="jobTitle"
          value={props.values.jobTitle}
          placeholder="Ex: Marketing Manager"
          onChange={props.handleInput}
        />
        <InputLabel>Company</InputLabel>
        <TextField  
          variant="outlined" 
          fullWidth={true}
          type="text"
          className="company"
          name="company"
          value={props.values.company}
          placeholder="Ex: Google"
          onChange={props.handleInput}
        />
        <FlexWrapper>
          <div style={{width:"40%"}}>
            <InputLabel>City</InputLabel>
            <TextField  
              variant="outlined" 
              fullWidth={true}
              type="text"
              name="city"
              defaultValue={props.values.city}
              onChange={props.handleInput}
            />
          </div>
          <div style={{width:"20%"}}>
            <InputLabel>State</InputLabel>
            <TextField  
              variant="outlined" 
              fullWidth={true}
              type="text"
              name="jobState"
              defaultValue={props.values.jobState}
              onChange={props.handleInput}
            />
          </div>
          <div style={{width:"30%"}}>
            <InputLabel>Country</InputLabel>
            <TextField  
              variant="outlined" 
              fullWidth={true}
              type="text"
              name="country"
              defaultValue={props.values.country}
              onChange={props.handleInput}
            />
          </div>
        </FlexWrapper>
        <InputLabel>Industry</InputLabel>
        <Select
          value={props.values.industry}
          name="industry"
          onChange={props.handleInput}
          input={<BootstrapInput />}
        >
          <MenuItem value="Software Development">Software Development</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Customer Service">Customer Service</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Otherqq">Other</MenuItem>
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkbox}
              onChange={handleCheckboxChange}
              name="currentRole"
              color="primary"
            />
          }
          label="I am currently in this role."
        />
      <InputLabel>Start Date</InputLabel>
        <div style={{display: 'flex'}}>
          <Select
            value={props.values.startMonth}
            name="startMonth"
            onChange={props.handleInput}
            input={<BootstrapInput />}
          >
          {months.map((month) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
          </Select>
          <div style={{width: "50px"}}></div>
          <Select
            value={props.values.startYear}
            name="startYear"
            onChange={props.handleInput}
            input={<BootstrapInput />}
          >
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
          </Select>
        </div>
        <InputLabel style={{ marginTop:"1em"}}>End Date</InputLabel>
        <div style={{display: 'flex'}}>
          <Select
            value={props.values.endMonth}
            name="endMonth"
            onChange={props.handleInput}
            input={<BootstrapInput />}
          >
          {months.map((month) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
          </Select>
          <div style={{width: "50px"}}></div>
          <Select
            value={props.values.endYear}
            name="endYear"
            onChange={props.handleInput}
            input={<BootstrapInput />}
          >
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
          </Select>
        </div>
      </FormItem>
      <DotStepper
        activeStep={1}
        handleNext={props.handleNext}
        positionBottom={true}
      />
    </Container>
  )
}

export default RegisterStep2