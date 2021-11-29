import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "../../components";
import Footer from "../../components/Footer";
import WaitlistCard from "./WaitListCard";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Box } from "@material-ui/core";

//imgs
import Stairs from "./images/stairs_large.png";
import Puzzles from "./images/puzzles.png";
import Cheer from "./images/cheer.png";

import { useHistory } from "react-router-dom";
import linkedinImage from "../../images/linkedinsignin.svg";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
`;
const FlexItem = styled.div`
  @media (min-width: 768px) {
    max-width: 300px;
  }
`;

const PaddingWrapper = styled.div`
  padding: 50px 15px;
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f3f8;
  padding: 1em;
  margin-bottom: 5em;
  border-radius: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 5em;
  }
`;

const CheerWrapper = styled.div`
  margin: 0px auto;
  @media (min-width: 768px) {
    margin: 0;
    max-width: 400px;
  }
`;

const TitleContainer = styled.div`
  // max-width: 300px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: "left";
  @media (min-width: 768px) {
    text-align: left;
    margin-left: 70px;
    // max-width: 350px;
  }
`;

const HeroTitle = styled.p`
  font-family: "Roboto";
  font-weight: bold;
  color: "#000000";
  width: 452px;
  font-size: 45px;
  text-align: "center";
  @media (max-width: 768px) {
    font-size: 20px;
    width: auto;
  }
`;

const RegisterButton = styled.button`
  background-color: #51b6a5;
  border-radius: 40px;
  border: 1px solid;
  border-color: #51b6a5;
  boxshadow: none;
  shadows: none;
  height: 35px;
  width: 194px;
  text-transform: none;
  margin-left: 10px;
  color: white;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    color: black;
  }
  &:hover {
    background-color: #2d6c61;
  }
  &:active {
    background-color: #2d6c61;
  }
`;

const StairsGreyBg = styled.div`
  background-color: #f5f3f8;
  margin: 0 auto;
  margin-bottom: 45px;
  @media (min-width: 768px) {
    order: 2;
  }
`;

const StairsImage = styled.img`
  width: 100%;
  height: 500px;
  max-width: 600px;
  display: block;
  margin: 0 auto;
  padding-top: 20%;
`;

const OrderedSide = styled.div`
  @media (min-width: 768px) {
    order: 1;
  }
`;

const PuzzleImage = styled.img`
  // display: block;
  // margin: 0 auto;
  width: auto;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const PuzzleGreyBg = styled.div`
  background-color: #0000;
  margin-left: 39px;
`;

const CheerImage = styled.img`
  width: 100%;
  margin-bottom: 30%;
  margin-left: -40%;
  @media (max-width: 768px) {
    margin-left: 0%;
  }
`;

const CheerTitleBox = styled.div`
  width: 281px;
  // text-align: center;
  height: 51px;
  // margin: 0 auto;
  margin-bottom: 90px;
  margin-top: 39px;
  @media (max-width: 768px) {
    margin-bottom: 60px;
    margin-top: 9px;
  }
`;

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  Title: {
    fontSize: 20,
    fontWeight: "Bold",
    color: "#000000",
    textAlign: "center",
  },
  BodyHeader: {
    fontSize: 45,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 30,
    width: 565,
    height: 113,
    "@media (max-width:780px)": {
      width: "auto",
      fontSize: 20,
      marginBottom: 15,
      height: "auto",
    },
  },
  Header: {
    fontStyle: "Semibold",
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Header2: {
    fontStyle: "Semibold",
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Header3: {
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Body: {
    fontStyle: "Regular",
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
  },
  WaitlistCard: {
    paddingTop: 50,
    paddingLeft: 50,
  },
  CardsFlux: {
    marginLeft: -120,
    "@media (max-width:780px)": {
      marginLeft: 10,
    },
  },
  WaitlistCard1: {
    paddingTop: 50,
  },
  SubTitle: {
    color: "#6D6D6D",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    marginTop: -40,
    paddingLeft: 70,
    display: "block",
    "@media (max-width:780px)": {
      paddingLeft: 10,
      display: "none",
    },
  },
  LinkedIn: {
    display: "flex",
    marginTop: 20,
    paddingLeft: 70,
    "@media (max-width:780px)": {
      paddingLeft: 10,
    },
  },
  MessageButton: {
    backgroundColor: "#51B6A5",
    border: "none",
    borderRadius: 40,
    marginTop: 20,
    width: "194px",
    height: "35px",
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "white",
  },
  Or: {
    marginLeft: 20,
    marginRight: 20,
    color: "#6D6D6D",
    paddingTop: 7,
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  LinkedImage: {
    display: "block",
    cursor: "pointer",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  WorkFlex: {
    display: "flex",
    "@media (max-width:780px)": {
      display: "block",
    },
  },
  WorkImage: {
    width: "auto",
    "@media (max-width:780px)": {
      width: "300px",
    },
  },
  DreamCareer: {
    marginLeft: 50,
    "@media (max-width:780px)": {
      marginLeft: 10,
    },
  },
});

export default function LandingPage(props) {
  const history = useHistory();
  const classes = useStyles(props);
  return (
    <div>
      {/* <Container > */}
      {/* <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Container> */}
          <Menu
            handleBack={() => history.push("/")}
            registrationMenu={true}
            showBackButton={false}
          />
        {/* </Container> */}
      {/* // </div> */}
      <div
        style={{
          backgroundColor: "#f5f3f8",
        }}
      >
        <Container>
          <HeroWrapper>
            <StairsGreyBg>
              <StairsImage src={Stairs} />
            </StairsGreyBg>
            <OrderedSide>
              <TitleContainer>
                <HeroTitle>
                  Find a mentor who can help guide you to success.{" "}
                </HeroTitle>
              </TitleContainer>
              <Typography variant="h6" className={classes.SubTitle}>
                Currently open for designers, software professionals
              </Typography>
              {/* <WaitlistCard className={classes.WaitlistCard} /> */}
              <Box className={classes.LinkedIn}>
                <img src={linkedinImage} className={classes.LinkedImage} />
                <span className={classes.Or}>or</span>
                <RegisterButton>Register</RegisterButton>
              </Box>
            </OrderedSide>
          </HeroWrapper>
        </Container>
      </div>
      <Container>
        <Box className={classes.WorkFlex}>
          {/* <PuzzleGreyBg> */}
          <img src={Puzzles} className={classes.WorkImage} />
          {/* </PuzzleGreyBg> */}
          <PaddingWrapper>
            <Typography className={classes.BodyHeader}>How It Works</Typography>
            <Typography className={classes.Header}>Register</Typography>
            <Typography className={classes.Body}>
              Sign Up as a mentee or mentor.
            </Typography>
            <Typography className={classes.Header2}>Match</Typography>

            <Typography className={classes.Body}>
              Get Matched with mentees or mentors.
            </Typography>

            <Typography className={classes.Header2}>Chat</Typography>
            <Typography className={classes.Body}>
              Engage in a coversation with your mentor or mentee.
            </Typography>
          </PaddingWrapper>
        </Box>
      </Container>
      <div
        style={{
          backgroundColor: "#f5f3f8",
        }}
      >
        <Container>
          <FlexWrapper
            style={{
              backgroundColor: "#f5f3f8",
              padding: "50px 15px",
              marginTop: 100,
              marginBottom: 100,
              borderRadius: 10,
            }}
          >
            {/* <div style={{ marginTop: 30, maxWidth: "300px" }}> */}
            <Typography className={classes.BodyHeader}>
              Why Open
              <br /> Mentorship?
            </Typography>
            {/* </div> */}

            <FlexItem>
              <div style={{ marginTop: 20 }}>
                <Typography className={classes.Header3}>
                  Career Advice
                </Typography>
                <Typography className={classes.Body}>
                  Receive career advice from professionals with years of
                  experience in your field, and feel confident moving forward in
                  your career.
                </Typography>
              </div>
              <div style={{ marginTop: 20 }}>
                <Typography className={classes.Header3}>
                  Strengthen your work
                </Typography>
                <Typography className={classes.Body}>
                  Share your portfolio, work examples, or resume with mentors
                  and receive constructive feedback before your next big
                  interview.
                </Typography>
              </div>
            </FlexItem>
            <FlexItem>
              <div style={{ marginTop: 20 }}>
                <Typography className={classes.Header3}>
                  Expand your network
                </Typography>
                <Typography className={classes.Body}>
                  Both mentees and mentors can grow their network and make
                  lasting connections that could benefit both careers in the
                  future.
                </Typography>
              </div>
              <div style={{ marginTop: 20 }}>
                <Typography className={classes.Header3}>Guidance</Typography>
                <Typography className={classes.Body}>
                  Explore your career options and feel empowered making your
                  next decision towards your dream job.
                </Typography>
              </div>
            </FlexItem>
          </FlexWrapper>
        </Container>
      </div>

      <Container>
        <FlexWrapper>
          <CheerWrapper>
            <CheerImage src={Cheer} />
          </CheerWrapper>
          <div className={classes.DreamCareer}>
            <Typography className={classes.BodyHeader}>
              Get on the path of your dream career with us today.
            </Typography>
          </div>
        </FlexWrapper>
      </Container>
      <div
        style={{
          backgroundColor: "#f5f3f8",
        }}
      >
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
