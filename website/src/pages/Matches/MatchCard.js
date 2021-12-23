import React, { useState } from "react";
import MatchProfile from "./MatchProfile";

//Material-UI
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//dummy image
import img from "./images/Rectangle146.png";

const Title = styled.p`
  width: 215px;
  font-family: Proxima Nova;
  font-size: 20px;
  font-weight: 1000;
  padding-top: 32px;
`;

const Body = styled.p`
  font-family: Proxima Nova;
  font-weight: 1000;
  font-size: 14px;
`;

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 134,
    padding: 10,
    borderRadius: 16,
  },
  cardSpacing: {
    marginTop: 15,
  },
  title: {
    fontFamily: "Proxima Nova",
    fontSize: 16,
    fontWeight: "Bold",
    color: "#000000",
  },
  body: {
    fontFamily: "Proxima Nova",
    fontSize: 14,
    color: "#6D6D6D",
  },
});

const MatchCard = ({
  handleBackButtonVisibility,
  showProfile,
  setShowProfile,
  currentMatches,
  isMentor,
}) => {
  const classes = useStyles();
  function handleClick(id) {
    setShowProfile();
    setSelectedProfileId(id);
    handleBackButtonVisibility();
  }

  //we need match data as props here from matches page ie . State =  [active: [data]]

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const selectedProfile = currentMatches?.find(
    (match) => match._id === selectedProfileId
  );

  if (selectedProfile && showProfile) {
    return <MatchProfile selectedProfile={selectedProfile} />;
  }
  //we need a way to show specific text for mentee and mentor users : put a isMentor variable in the API data
  return (
    <div>
      {isMentor == "mentor" ? (
        <div>
          <Title>Here’s your curated list of potential mentees!</Title>
          <Body>yes</Body>
        </div>
      ) : (
        <div>
          <Title>Here’s your curated list of potential mentors!</Title>
          <Body>
            Send message requests to the mentors that you would like to work
            with until the deadline of April 29. They will receive your request
            and let you know if they want to work with you. Good luck!
          </Body>
        </div>
      )}
      {currentMatches?.map((match) => (
        <div key={match._id} className={classes.cardSpacing} profile={match}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              component="img"
              alt=""
              image={img}
              title=""
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  component="h2"
                >
                  {match.firstName + " " + match.lastName}
                </Typography>
                <Typography
                  className={classes.body}
                  variant="body2"
                  component="p"
                >
                  {match.WorkExperiences[0].title +
                    " at " +
                    match.WorkExperiences[0].company}
                </Typography>
              </CardContent>

              <Button
                style={{
                  backgroundColor: "#51B6A5",
                  fontFamily: "Proxima Nova",
                  height: 25,
                  width: 134,
                  marginBottom: 20,
                  textTransform: "none",
                  marginLeft: 15,
                }}
                variant="contained"
                onClick={() => handleClick(match._id)}
              >
                View full profile
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MatchCard;
