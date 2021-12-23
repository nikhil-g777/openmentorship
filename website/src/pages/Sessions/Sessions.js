// Packages
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// Project Imports
// import { getSessions } from "../../api";
import { getSessions } from "../../redux/Actions/SessionActions";
import { Menu } from "../../components";
import SessionCard from "./SessionCard";

import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const SessionListContainer = styled.div`
  margin-top: 50px;
`;

const Sessions = () => {
  const dispatch = useDispatch();
  const [sessionList, setSessionList] = useState([]);
  const [sessionComponets, setSessionComponents] = useState([]);

  function handleClick() {
    //handle session click events
  }

  const sessions = useSelector((store) => store.sessionsreducer.sessions);
  console.log("sesssionnssss: ", sessions);

  useEffect(() => {
    // Fetch sessions

    async function fetchSessions() {
      await dispatch(getSessions());
    }
    if (sessions?.sessions?.length > 0) {
      setSessionComponents(
        sessions.sessions.map((session) => {
          return (
            <SessionCard
              session={session}
              key={session._id}
              onClick={handleClick}
            />
          );
        })
      );
    }

    fetchSessions();
    // getSessions()
    //   .then((res) => {
    //     setSessionList(res.data.sessions);
    //     setSessionComponents(
    //       res.data.sessions.map((session) => {
    //         return (
    //           <SessionCard
    //             session={session}
    //             key={session._id}
    //             onClick={handleClick}
    //           />
    //         );
    //       })
    //     );
    //   })
    //   .catch((err) => console.log(err));
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
