import React, { useState, useEffect } from "react";
import Card from "./MatchCard";
import Profile from "./MatchProfile";
import CardType from "./CardType";
import styled from "styled-components";
import { Menu } from "../../components";
import {getUserMatches} from '../../api'; 

const Container = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`;

//api.get for match data
//populate state with match data
//when user clicks Active/Pending/Closed -> render .map() active/pending/closed matches with its data passed as props into mentorCard

export default function MentorMatches() {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [isMentor, setIsMentor] = useState([]);

  //Load matches API
  useEffect(() => {
    const APP_ID = localStorage.getItem("userId");
    getUserMatches({ _id: APP_ID })
      .then((res) => {
        setMatchData(res.data.matches);
        console.log('res.data',res.data)
        setCurrentMatches(res.data.matches.pending)
        setIsMentor(res.data.userType)

      })
      .catch((err) => console.log(err));
  }, []);

  //MatchTab Management
  const [active, setActiveTab] = useState({
    pending: true,
    active: false,
    closed: false,
  });

  function handleBackButtonVisibility() {
    setShowBackButton(true);
  }

  function handleGoBack() {
    setCurrentMatches(null);
    setShowBackButton(false);
    setShowProfile(false);
  }

  function handleSecondaryTab(value) {
    if (value == "pending") {
      setActiveTab({ pending: true, active: false, closed: false });
      setCurrentMatches(matchData.pending);
    } else if (value == "active") {
      setActiveTab({ pending: false, active: true, closed: false });
      setCurrentMatches(matchData.active);
    } else if (value == "closed") {
      setActiveTab({ pending: false, active: false, closed: true });
      setCurrentMatches(matchData.closed);
    }
    setShowProfile(false);
    setShowBackButton(false);
  }
  return (
    <>
    <Menu handleBack={handleGoBack} showBackButton={showBackButton} />
    <CardType props={active} handleSecondaryTab={handleSecondaryTab} />
    <Container>
      <Card
        showProfile={showProfile}
        setShowProfile={() => setShowProfile(true)}
        handleBackButtonVisibility={handleBackButtonVisibility}
      />
    </Container>
    </>
  );
}
