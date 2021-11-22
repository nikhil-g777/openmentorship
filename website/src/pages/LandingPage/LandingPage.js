import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "../../components";
import Footer from "../../components/Footer";
import WaitlistCard from "./WaitListCard";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery ,Container } from "@material-ui/core";

//imgs
import Stairs from "./images/stairs_large.png";
import Puzzles from "./images/puzzles.png";
import Cheer from "./images/cheer.png";
// import useMediaQuery from '@mui/material/useMediaQuery';
//packages
import { useHistory } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto;
  
// `;

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
    max-width: 300px;
  }
`;

const TitleContainer = styled.div`
  // max-width: 300px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
    max-width: 350px;
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
    font-size: 40px;
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
  height: auto;
  max-width: 600px;
  display: block;
  margin: 0 auto;
  margin-top: 22px;
`;

const OrderedSide = styled.div`
  @media (min-width: 768px) {
    order: 1;
  }
`;

const PuzzleImage = styled.img`
  display: block;
  margin: 0 auto;
  width:720px;
  @media (max-width: 768px) {
    width:300px;
  }
`;

const PuzzleGreyBg = styled.div`
  background-color: #0000;
  margin-left: 39px;

`;

const CheerImage = styled.img`
  width: 100%;
`;

const CheerTitleBox = styled.div`
  width: 281px;
  // text-align: center;
  height: 51px;
  // margin: 0 auto;
  margin-bottom: 90px;
  margin-top: 39px;
  @media (max-width: 768px) {
    margin-bottom: 290px;
  }
`;

const useStyles = makeStyles({
  root: {
    fontFamily: "Roboto",
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
    '@media (max-width:780px)': {
      width: 'auto',
    }
    
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
    marginLeft:-120,
    '@media (max-width:780px)': {
      marginLeft:10,
    
    }
    
  },
  WaitlistCard1: {
    paddingTop: 50,
  },
});

export default function LandingPage(props) {
  const history = useHistory();
  const classes = useStyles(props);
  return (
    <Container>

    <div>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
        <HeroWrapper>
          <StairsGreyBg>
            <StairsImage src={Stairs} />
          </StairsGreyBg>
          <OrderedSide>
            <TitleContainer>
              <HeroTitle>
              Let’s build an Openmentorship community together.
              </HeroTitle>
            </TitleContainer>
            <WaitlistCard className={classes.WaitlistCard} />
          </OrderedSide>
        </HeroWrapper>
        <FlexWrapper>
          <PuzzleGreyBg>
            <PuzzleImage src={Puzzles} />
          </PuzzleGreyBg>
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
        </FlexWrapper>

        <FlexWrapper
          style={{ backgroundColor: "#f5f3f8", padding: "50px 15px" ,marginTop:100,marginBottom:100}}
        >
          <div style={{ marginTop: 30, maxWidth: "300px" }}>
            <Typography className={classes.BodyHeader}>
              Why Open<br/> Mentorship?
            </Typography>
          </div>

          <FlexItem>
            <div style={{ marginTop: 20 }}>
              <Typography className={classes.Header3}>Career Advice</Typography>
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
                Share your portfolio, work examples, or resume with mentors and
                receive constructive feedback before your next big interview.
              </Typography>
            </div>
          </FlexItem>
          <FlexItem>
            <div style={{ marginTop: 20 }}>
              <Typography className={classes.Header3}>
                Expand your network
              </Typography>
              <Typography className={classes.Body}>
                Both mentees and mentors can grow their network and make lasting
                connections that could benefit both careers in the future.
              </Typography>
            </div>
            <div style={{ marginTop: 20 }}>
              <Typography className={classes.Header3}>Guidance</Typography>
              <Typography className={classes.Body}>
                Explore your career options and feel empowered making your next
                decision towards your dream job.
              </Typography>
            </div>
          </FlexItem>
        </FlexWrapper>

        <FlexWrapper >
          <CheerWrapper>
            <CheerImage src={Cheer} />
          </CheerWrapper>
          <div>
            <CheerTitleBox>
              <Typography className={classes.BodyHeader}>
                Get on the path of your dream career with us today.
              </Typography>
            </CheerTitleBox>
            <div  className={classes.CardsFlux} >
            <WaitlistCard className={classes.WaitlistCard} />
            </div>
            {/* <Link style={{ margin: "0 auto" }} to="/register">
              <RegisterButton>Register</RegisterButton>
            </Link> */}
            {/* <WaitlistCard className={classes.WaitlistCard} /> */}
          </div>
        </FlexWrapper>
      <Footer />
    </div>
    </Container>

  );
}
