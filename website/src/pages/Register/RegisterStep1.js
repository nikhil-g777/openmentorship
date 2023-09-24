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
  Box,
  Typography
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { BootstrapInput, theme } from "../../app/GlobalTheme";

const RegisterStep1 = (props) => {
  const { handleUpdate } = props;

  const [alignment, setAlignment] = useState(props.values.userType);
  const [careerStatus, setCareerStatus] = useState(props.values.careerStatus);
  const [areasOfInterest, setAreasOfInterest] = useState(
    props.values.areasOfInterest
  );

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.handleUserType(newAlignment);
  };

  const handleChange = (event) => {
    setCareerStatus(event.target.value);
    props.handleCareerStatus(event.target.value);
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
            Tell us a little bit about yourself, it helps make the right
            connections
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
            value={careerStatus}
            name="careerStatus"
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
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
        {props.errorState && (
        <Box style={{ backgroundColor: "#F2DEE0", minHeight: 40, padding: 10 }}>
          <Typography style={{ color: "#A16F70" }}>
            Please choose at least one option on area of interest
          </Typography>
        </Box>
      )}
        <DotStepper activeStep={0} handleNext={props.handleNext} />
      </ThemeProvider>
    </Container>
  );
};

export default RegisterStep1;
