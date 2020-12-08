// Packages
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// Project Imports
import { getSessions } from "../../api";
import { Menu } from "../../components";
import SessionCard from "./SessionCard";

const Container = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const SessionListContainer = styled.div`
  margin-top: 50px;
`;

const Sessions = () => {
  const [sessionList, setSessionList] = useState([]);
  const [sessionComponets, setSessionComponents] = useState([]);

  function handleClick() {
    //handle session click events
  }

  useEffect(() => {
    // Fetch sessions
    getSessions()
      .then((res) => {
        setSessionList(res.data.sessions);
        setSessionComponents(
          res.data.sessions.map((session) => {
            return (
              <SessionCard
                session={session}
                key={session._id}
                onClick={handleClick}
              />
            );
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleGoBack() {}

  return (
    <>
      <Menu handleBack={handleGoBack} showBackButton={false} />
      <Container>
        <Typography variant="h4">
          {" "}
          Please select from one of the following sessions:{" "}
        </Typography>
        <SessionListContainer>{sessionComponets}</SessionListContainer>
      </Container>
    </>
  );
};

export default Sessions;
