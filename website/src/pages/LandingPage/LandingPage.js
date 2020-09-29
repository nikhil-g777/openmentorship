import React from "react";
import { Link } from "react-router-dom";
import MobileNavBar from "../../components/MobileNavBar";
import Footer from "../../components/Footer";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//imgs
import Stairs from "./images/stairs.png";
import Puzzles from "./images/puzzles.png";
import Cheer from "./images/cheer.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 269px;
  height: 51px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const RegisterButton = styled.button`
  background-color: #51b6a5;
  border-radius: 40px;
  border: 1px solid;
  border-color: #51b6a5;
  boxshadow: none;
  shadows: none;
  font-family: Proxima Nova;
  height: 47px;
  width: 343px;
  text-transform: none;
  margin-left: 10px;
  margin: 0 auto;
  margin-bottom: 65px;
  &:hover {
    background-color: #2d6c61;
  }
  &:active {
    background-color: #2d6c61;
  }

`;

const StairsImage = styled.img`
  width: 274px;
  height: 222px;
  display: block;
  margin: 0 auto;
  margin-top: 22px;
`;

const StairsGreyBg = styled.div`
  width: 100%;
  height: 218px;
  background-color: #f5f3f8;
  z-index: -1;
  margin: 0 auto;
  margin-bottom: 45px;
`;

const PuzzleImage = styled.img`
  width: 312px;
  height: 167px;
  display: block;
  margin: 0 auto;
`;

const PuzzleGreyBg = styled.div`
  width: 100%;
  height: 135px;
  background-color: #f5f3f8;
`;

const CheerImage = styled.img`
  width: 281px;
  height: 225px;
  display: block;
  margin: 0 auto;
  margin-top: 65px;
`;

const CheerTitleBox = styled.div`
  width: 281px;
  text-align: center;
  height: 51px;
  margin: 0 auto;
  margin-bottom: 40px;
  margin-top: 39px;
`;

const TextContainer = styled.div`
  width: 343px;
  margin: 0 auto;
`;

const useStyles = makeStyles({
  Title: {
    fontFamily: "Proxima Nova",
    fontSize: 20,
    fontWeight: "Bold",
    color: "#000000",
    textAlign: "center",
  },
  BodyHeader: {
    fontFamily: "Proxima Nova",
    fontSize: 20,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 25,
  },
  Header: {
    fontFamily: "Proxima Nova",
    fontStyle: "Semibold",
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Header2: {
    fontFamily: "Proxima Nova",
    fontStyle: "Semibold",
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Header3: {
    fontFamily: "Proxima Nova",
    fontStyle: "Semibold",
    fontSize: 18,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 6,
  },
  Body: {
    fontFamily: "Proxima Nova",
    fontStyle: "Regular",
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
  },
});

export default function LandingPage(props) {
  const classes = useStyles(props);
  return (
    <div>
      <MobileNavBar />
      <Container className={classes.root}>
        <StairsGreyBg>
          <StairsImage src={Stairs} />
        </StairsGreyBg>
        <TitleContainer>
          <Typography className={classes.Title}>
            Find a mentor who can help guide you to success.
          </Typography>
        </TitleContainer>
        <Link style={{ margin: "0 auto" }} to="/register">
          <RegisterButton>Register</RegisterButton>
        </Link>

        <PuzzleGreyBg>
          <PuzzleImage src={Puzzles} />
        </PuzzleGreyBg>
        <TextContainer>
          <div style={{ marginTop: 65, marginLeft: 16, marginBottom: 60 }}>
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
          </div>
        </TextContainer>
        <div style={{ backgroundColor: "#f5f3f8" }}>
          <div style={{ marginLeft: 16, marginTop: 30 }}>
            <TextContainer>
              <Typography className={classes.BodyHeader}>
                Why Open Mentorship?
              </Typography>
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
            </TextContainer>
          </div>
        </div>

        <CheerImage src={Cheer} />
        <CheerTitleBox>
          <Typography className={classes.BodyHeader}>
            Get on the path of your dream career with us today.
          </Typography>
        </CheerTitleBox>
        <Link style={{ margin: "0 auto" }} to="/register">
          <RegisterButton>Register</RegisterButton>
        </Link>
      </Container>
      <Footer />
    </div>
  );
}
