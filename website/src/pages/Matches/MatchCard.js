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

//Dummy Data
const mentorData = {
  Name: "Meghan Raab",
  Job: "Product Marketing Manager at Snap Inc.",
  YearsExperience: 5,
  id: 1,
  Biography:'I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.',
  areasOfInterest: 'Product marketing, content marketing, media, global tech, project management', 
  topSkills: 'User acquisition, digital marketing, product marketing, leadership, marketing analytics',
  openToProviding: ['Mock Interview', 'Project Review', 'Resume Review', 'Collaboration on an idea', 'career changing advice' , 'career advice'],
  userImage: img,
};

const mentorData2 = {
  Name: "Mddan Raab",
  Job: "Product Marketing Manager at Snap Inc.",
  YearsExperience: 5,
  id: 2,
  Biography:'I have previously worked with Sephora, LinkedIn, Blue Shield of California, and University of San Francisco. I’m interested in growth marketing, product marketing, content marketing, user acquisition and retention, and customer experience.',
  areasOfInterest: 'Product marketing, content marketing, media, global tech, project management',
  topSkills: 'User acquisition, digital marketing, product marketing, leadership, marketing analytics', 
  openToProviding: ['dasasdiew', 'Project Review', 'Resume Review', 'Collaboration on an idea', 'career changing advice' , 'career advice'],
  userImage: img,
};

const mentorList = [mentorData, mentorData2];
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
}) => {
  const classes = useStyles();
  function handleClick(id) {
    setShowProfile();
    setSelectedProfileId(id);
    handleBackButtonVisibility();
  }

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const selectedProfile = mentorList.find((x) => x.id === selectedProfileId);

  if (selectedProfile && showProfile) {
    return <MatchProfile selectedProfile={selectedProfile} />;
  }

  return (
    <div>
      <Title>Here’s your curated list of potential mentors!</Title>
      <Body>
        Send message requests to the mentors that you would like to work with
        until the deadline of April 29. They will receive your request and let
        you know if they want to work with you. Good luck!
      </Body>
      {mentorList.map((x) => (
        <div className={classes.cardSpacing} profile={x}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              component="img"
              alt=""
              image={x.userImage}
              title=""
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  component="h2"
                >
                  {x.Name}
                </Typography>
                <Typography
                  className={classes.body}
                  variant="body2"
                  component="p"
                >
                  {x.Job}
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
                onClick={() => handleClick(x.id)}
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
