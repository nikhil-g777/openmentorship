import React, { useContext, useState, useEffect } from "react";
import { Menu } from "../../components";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ChatNav } from "../../components";
import './Chat.css';

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

const Chat = (props) => {
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
      <div class="container chat-pannel">
        <div class="row">
          <div class="col-3 chat-left">
          <i class="fas fa-circle"></i>
            <h6 class="drop-down">Meghan Raab    ></h6>
            <hr></hr>
            <i class="fas fa-circle"></i>
            <h6 class="drop-down2">Erin Rapaport     ></h6>
          </div>
          <div class="col-8 chat-right">
            <h6 class="chat-date">MONDAY,APRIL 30</h6>
            <i class="fas fa-circle left-icon"></i>
            <p class="left">Hi! I'm looking forward to working with you! </p>
            <p class="right">Hi Meghana! Thanks i'm exited to get to know you more, and hopefully learn from each other!</p>
            <i class="fas fa-circle left-icon"></i>
            <p class="left">Hi! I'm looking forward to working with you!</p>
            <p class="right">Hi Meghana! Thanks i'm exited to get to know you more, and hopefully learn from each other!</p>
            <i class="fas fa-circle left-icon"></i>
            <p class="left">Hi! I'm looking forward to working with you!</p>
            <p class="right">Hi Meghana! Thanks i'm exited to get to know you more, and hopefully learn from each other!</p>


          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
