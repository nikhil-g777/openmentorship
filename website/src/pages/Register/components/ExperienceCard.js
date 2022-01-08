import React from "react";
import { Button, makeStyles, withStyles, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  viewButtonLabel: {
    textTransform: "none",
  },
  link: {
    color: "inherit",
  },
}));

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Entity = styled.div`
  display: flex;
  justify-contect: space-evenly;
`;

const StyledButton = withStyles({
  root: {
    background: "#69b595",
    borderRadius: 3,
    margin: "1rem",
  },
  text: {
    width: "30%",
  },
})(Button);

const ExperienceCard = (props) => {
  const {
    id,
    title1,
    value1,
    title2,
    value2,
    handleChange,
    handleClear,
  } = props;

  const classes = useStyles();

  return (
    <ExperienceContainer>
      <Entity>
        <TextField
          id={"title1_" + id}
          label={title1}
          variant="outlined"
          fullWidth={true}
          type="text"
          name={title1}
          value={value1}
          onChange={handleChange}
          style={{
            margin: "1rem 1rem 1rem 0",
          }}
        />
        <TextField
          id={"title2_" + id}
          label={title2}
          variant="outlined"
          fullWidth={true}
          type="text"
          name={title2}
          value={value2}
          onChange={handleChange}
          style={{
            margin: "1rem 1rem 1rem 0",
          }}
        />
        <StyledButton id={id} onClick={handleClear}>
          <CloseIcon disabled />
        </StyledButton>
      </Entity>
    </ExperienceContainer>
  );
};

export default ExperienceCard;
