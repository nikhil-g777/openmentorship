import React, { useState } from "react";
import Card from "./MatchCard";
import CardType from "./cardType";
import styled from "styled-components";
import LogoNavBar from "./images/LogoNavBar.png";
import userIcon from "./images/userIcon.png";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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

//load in active/pending/closed data into the various cards here
export default function MentorMatches() {
  const [cardType, setCardType] = useState("pending");
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const [active, setActiveTab] = useState({
    pending: true,
    active: false,
    closed: false,
  });

  function handleBackButtonVisibility() {
    //user clicks on card to see profile
    setShowBackButton(true);
    setShowCards(false);
  }

  function handleGoBack() {
    //user clicks back button
    setShowBackButton(false);
    setShowCards(true);
  }

  function handleSecondaryTab(value) {
    setCardType(value);
    if (value == "pending") {
      setActiveTab({ pending: true, active: false, closed: false });
    } else if (value == "active") {
      setActiveTab({ pending: false, active: true, closed: false });
    } else if (value == "closed") {
      setActiveTab({ pending: false, active: false, closed: true });
    }
    setShowCards(true);
  }

  switch (cardType) {
    case "pending":
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
          {showCards == true ? (
            <Card onClick={handleBackButtonVisibility} />
          ) : null}
          <p>Matches Page Pending</p>
        </div>
      );
    case "active":
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
          {showCards == true ? (
            <Card onClick={handleBackButtonVisibility} />
          ) : null}
          <p>Matches Page Active</p>
        </div>
      );
    case "closed":
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
          {showCards == true ? (
            <Card onClick={handleBackButtonVisibility} />
          ) : null}
          <p>Matches Page Closed </p>
        </div>
      );
  }
}
