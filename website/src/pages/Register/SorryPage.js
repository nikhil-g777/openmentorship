import React from "react";
import styled from "styled-components";
import { Button, withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Container, TitleWrapper, Title } from "../../components";
import { StyledButton } from "../../components/StyledForm";

const Message = styled.p`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
`;

const Note = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OptionButton = withStyles({
  root: {
    textTransform: "none",
  },
  text: {
    border: "2px solid #69b595 !important",
    background: "white !important",
    borderRadius: "30px !important",
    fontSize: "1rem",
    padding: "1em !important",
    width: "45%",
  },
})(Button);

const SorryPage = () => {
  const history = useHistory();

  const redirectHome = () => {
    history.push("/");
  };

  return (
    <Container>
      <Message>
        Sorry, we are still working to make this platform available to you
      </Message>
      <Note>Would you like to be notified when its available ?</Note>
      <ButtonContainer>
        <OptionButton onClick={redirectHome}>I'll come back later</OptionButton>
        <OptionButton onClick={redirectHome}>Keep me posted!</OptionButton>
      </ButtonContainer>
    </Container>
  );
};

export default SorryPage;
