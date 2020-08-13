import React, { useState } from 'react'
import { BackButton, Container, DotStepper, FormItem, Title, TitleWrapper } from "../../components"
import { BootstrapInput } from "../../app/GlobalTheme"

import { FormControl, FormControlLabel, Checkbox, Input, InputBase, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import styled from 'styled-components'

const LinkedInButton = styled.button`
  width:135px;
  display:flex;
  margin: 0 auto;
`

const AddExperience = styled.p`
  font-weight: 600;
  text-decoration:underline;
  margin-top:1em;
  &:hover {
    cursor:pointer;
  }
`

const RegisterStep2 = props => {
  const [ industry, setIndustry ] = useState(props.values.industry)
  const [ checkbox, setCheckbox ] = useState(props.values.currentRole)
  const [ dates, setDates ] = useState({
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: ""
  })
  const emptyJob = { jobTitle: "", company: "" }
  const [ jobs, setJobs ] = useState([{...emptyJob}])

  const handleChange = (event) => {
    setIndustry(event.target.value)
    props.handleIndustry(event.target.value)
  }

  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked)
    props.handleCheckbox(event)
  }

  const handleJobExperience = e => {
    console.log(e)
    const updatedJobs = [...jobs]
    updatedJobs[e.target.dataset.idx][e.target.className] = e.target.value
    setJobs(updatedJobs)
  }

  const handleAddNewExperience = (e) => {
    setJobs([...jobs, {...emptyJob}])
  }

  const handleDates = (event) => {
    setDates({...dates, [event.target.name]: event.target.value})
  }
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]
  
  return (
    <Container>
      <TitleWrapper>
        <BackButton handleBack={props.handleBack} />
        <Title>Work Experience</Title>
      </TitleWrapper>
      <LinkedInButton>Sync with LinkedIn</LinkedInButton>
      <FormItem>
      {jobs.map((val, idx) => {
        const jobTitleId = `jobTitle-${idx}`
        const companyId = `company-${idx}`
        return (
          <>
          <h6 style={{fontWeight:'600', marginTop:"2em"}}>{`Work Experience #${idx + 1}`} </h6>
          <InputLabel>Job Title</InputLabel>
        <TextField 
          variant="outlined" 
          fullWidth={true}
          type="text"
          className="jobTitle"
          id={jobTitleId}
          name={jobTitleId}
          data-idx={idx}
          value={jobs[idx].jobTitle}
          // defaultValue={props.values.jobTitle}
          placeholder="Ex: Marketing Manager"
          onChange={handleJobExperience}
        />
        <InputLabel htmlFor="component-simple">Company</InputLabel>
        <TextField  
          variant="outlined" 
          fullWidth={true}
          type="text"
          className="company"
          id={companyId}
          name={companyId}
          data-idx={idx}
          value={jobs[idx].company}
          // defaultValue={props.values.company}
          placeholder="Ex: Google"
          onChange={handleJobExperience}
        />
        <InputLabel htmlFor="component-simple">Location</InputLabel>
        <TextField  
          variant="outlined" 
          fullWidth={true}
          type="text"
          name="location"
          defaultValue={props.values.location}
          placeholder="Ex: San Francisco"
          onChange={props.handleInput}
        />
      <InputLabel>Industry</InputLabel>
        <Select
          value={industry}
          name="industry"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="Software Development">Software Development</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Customer Service">Customer Service</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
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
            value={dates.startMonth}
            name="startMonth"
            onChange={handleDates}
            input={<BootstrapInput />}
          >
          {months.map((month) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
          </Select>
          <div style={{width: "50px"}}></div>
          <Select
            value={dates.startYear}
            name="startYear"
            onChange={handleDates}
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
            value={dates.endMonth}
            name="startMonth"
            onChange={handleDates}
            input={<BootstrapInput />}
          >
          {months.map((month) => (
            <MenuItem value={month}>{month}</MenuItem>
          ))}
          </Select>
          <div style={{width: "50px"}}></div>
          <Select
            value={dates.endYear}
            name="startYear"
            onChange={handleDates}
            input={<BootstrapInput />}
          >
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
          </Select>
        </div>
          </>
        )
      })}
        <AddExperience onClick={handleAddNewExperience}>Add another experience</AddExperience>
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