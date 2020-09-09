import React, { useState, useEffect } from "react";
import Card from "./MatchCard";
import Profile from "./MatchProfile";
import CardType from "./CardType";
import styled from "styled-components";
import LogoNavBar from "./images/LogoNavBar.png";
import userIcon from "./images/userIcon.png";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getUserMatches } from "../../api/index";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 14px;
  padding-bottom: 14.69px;
  -webkit-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
`;

const Picture = styled.div`
  width: 32px;
  height: 32px;
`;

const LogoImg = styled(Picture)`
  background-size: cover;
  background-image: url(${LogoNavBar});
`;

const UserIcon = styled(Picture)`
  background-size: cover;
  background-image: url(${userIcon});
`;

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

  //Load matches API
  useEffect(() => {
    const APP_ID = localStorage.getItem("userId");
    getUserMatches({ _id: APP_ID })
      .then((res) => {
        setMatchData(res.data.matches);
        setCurrentMatches(res.data.matches.pending)
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
    <div>
      <Wrapper>
        {showBackButton == false ? (
          <Picture />
        ) : (
          <ArrowBackIosIcon
            style={{ width: 32, height: 32 }}
            onClick={() => handleGoBack()}
          />
        )}
        <LogoImg />
        <UserIcon />
      </Wrapper>
      <CardType props={active} handleSecondaryTab={handleSecondaryTab} />
      <Container>
        <Card
          currentMatches={currentMatches}
          showProfile={showProfile}
          setShowProfile={() => setShowProfile(true)}
          handleBackButtonVisibility={handleBackButtonVisibility}
        />
      </Container>
    </div>
  );
}
