import React from "react";
import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import styled from "styled-components";

import { StyledButton } from "../StyledForm";

const DotContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const DotStepper = (props) => {
  return (
    <DotContainer>
      <MobileStepper
        // style={props.positionBottom ? {} : { bottom: 0 }}
        variant="dots"
        steps={5}
        activeStep={props.activeStep}
        nextButton={
          <StyledButton onClick={props.handleNext} disabled={props.disabled}>
            Continue
          </StyledButton>
        }
      />
    </DotContainer>
  );
};
export default DotStepper;
