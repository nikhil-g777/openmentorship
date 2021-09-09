import React, { useState, useEffect } from "react";
import {
  Container,
  DotStepper,
  FormItem,
  Title,
  TitleWrapper,
} from "../../components";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { BootstrapInput, theme } from "../../app/GlobalTheme";

const RegisterStep1 = (props) => {
  const { handleUpdate } = props;

  const [alignment, setAlignment] = useState(props.values.userType);
  const [jobStatus, setJobStatus] = useState(props.values.jobStatus);
  const [areasOfInterest, setAreasOfInterest] = useState(
    props.values.areasOfInterest
  );

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.handleUserType(newAlignment);
  };

  const handleChange = (event) => {
    setJobStatus(event.target.value);
    props.handleJobStatus(event.target.value);
  };

  const handleChangeAreaOfInterest = (event) => {
    const { name, checked } = event.target;
    if (name == "other" && checked) {
      setAreasOfInterest({
        software: false,
        design: false,
        other: true,
      });
    } else {
      setAreasOfInterest({ ...areasOfInterest, [name]: checked, other: false });
    }
  };

  useEffect(() => {
    handleUpdate("areasOfInterest", areasOfInterest);
  }, [areasOfInterest]);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <TitleWrapper>
          <Title>
            Tell us a little bit about yourself so we can match you with the
            right mentors.
          </Title>
        </TitleWrapper>
        <FormItem>
          <p>I am registering as a:</p>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            size="large"
          >
            <ToggleButton value="mentee" aria-label="left aligned">
              Mentee
            </ToggleButton>
            <ToggleButton value="mentor" aria-label="right aligned">
              Mentor
            </ToggleButton>
          </ToggleButtonGroup>
        </FormItem>
        <FormItem>
          <p>Which of the following best describes you</p>
          <Select
            value={jobStatus}
            name="jobStatus"
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value="Looking for a job">Student</MenuItem>
            <MenuItem value="Currently working">Working</MenuItem>
          </Select>
        </FormItem>
        <FormGroup>
          <p>What is your area of interest</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={areasOfInterest.software}
                onChange={handleChangeAreaOfInterest}
                name="software"
                color="primary"
              />
            }
            label="Software"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={areasOfInterest.design}
                onChange={handleChangeAreaOfInterest}
                name="design"
                color="primary"
              />
            }
            label="Design"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={areasOfInterest.other}
                onChange={handleChangeAreaOfInterest}
                name="other"
                color="primary"
              />
            }
            label="Other"
          />
        </FormGroup>
        <DotStepper activeStep={0} handleNext={props.handleNext} />
      </ThemeProvider>
    </Container>
  );
};

export default RegisterStep1;
