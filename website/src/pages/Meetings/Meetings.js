import React, { useContext, useState, useEffect } from "react";
import { Menu } from "../../components";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ChatNav } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1em",
    flexGrow: 1,
    "& > *": {
      margin: "1em 0",
    },
  },
}));

const Info = styled.p`
  padding: 1em 3em 1em 3em;
`;

const LindkedInButton = styled.img`
  width: 200px;
`;

const Wrapper = styled.div`
  margin: 3em auto;
`;

const Meetings = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
      <ChatNav />
    </>
  );
};

export default Meetings;
