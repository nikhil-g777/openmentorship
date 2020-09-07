import React, { useState } from "react";
import Card from "./MatchCard";
import Profile from "./MatchProfile";
import CardType from "./CardType";
import styled from "styled-components";
import { Menu } from "../../components" 

const Container = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`;

//load in active/pending/closed data into the various cards here
//when user clicks Active -> do API call to populate props for Card in HandleSecondaryTab
export default function MentorMatches() {
  const [showBackButton, setShowBackButton] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [active, setActiveTab] = useState({
    pending: true,
    active: false,
    closed: false,
  });

  function handleBackButtonVisibility() {
    //user clicks on card to see profile
    setShowBackButton(true);
  }

  function handleGoBack() {
    //user clicks back button
    setShowBackButton(false);
    setShowProfile(false);
  }

  function handleSecondaryTab(value) {
    if (value == "pending") {
      setActiveTab({ pending: true, active: false, closed: false });
    } else if (value == "active") {
      setActiveTab({ pending: false, active: true, closed: false });
    } else if (value == "closed") {
      setActiveTab({ pending: false, active: false, closed: true });
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
