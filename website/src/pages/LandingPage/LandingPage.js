import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { Menu } from "../../components";
import Footer from "../../components/Footer";

import { loginUser } from "../../api";
import { UserContext } from "../../context/UserContext";

//mui
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//imgs
import Stairs from "./images/stairs_large.png";
import LinkedinSignin from "./images/Linkedin-Sign-In-Large-Default.png";
import Puzzles from "./images/puzzles.png";
import Cheer from "./images/cheer.png";

//packages
import { useHistory } from "react-router-dom";

// import "../../style/styles.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

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
    margin-bottom: 0;
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
  max-width: 700px;
  margin: 0 4rem;
  margin-bottom: 40px;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
    max-width: 700px;
  }
`;

const HeroTitle = styled.p`
  font-size: 2rem;
  color: "#000000";
  text-align: "center";
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SignupNote = styled.p`
  font-size: 1rem;
  color: gray;
  text-align: center
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
    margin-bottom: 3rem;
  }
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
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
  height: 2.7rem;
  width: 12.5rem;
  text-transform: none;
  color: white;
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

const LinkedinImage = styled.img`
  max-width: 180px;
`;

const OrText = styled.span`
  color: gray;
  margin: 1rem;
`;

const PuzzleImage = styled.img`
  display: block;
  margin: 0 auto;
`;

const PuzzleGreyBg = styled.div`
  background-color: #0000;
`;

const CheerImage = styled.img`
  width: 100%;
`;

const CheerTitleBox = styled.div`
  width: 281px;
  text-align: center;
  height: 51px;
  margin: 0 auto;
  margin-bottom: 40px;
  margin-top: 39px;
`;

const useStyles = makeStyles({
  root: {
    fontFamily: "proxima_nova",
  },
  Title: {
    fontSize: 20,
    fontWeight: "Bold",
    color: "#000000",
    textAlign: "center",
  },
  BodyHeader: {
    fontSize: 20,
    fontWeight: "Bold",
    color: "#000000",
    marginBottom: 25,
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
    fontStyle: "Semibold",
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
});

export default function LandingPage(props) {
  const history = useHistory();
  const classes = useStyles(props);

  const [isError, setIsError] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handleSuccess = (data) => {
    loginUser({
      authCode: data.code,
    })
      .then((response) => {
        if (response.data.success) {
          setUser({
            _id: response.data.user._id,
            userType: response.data.user.userType,
            token: response.data.token,
          });
          localStorage.setItem("token", JSON.stringify(response.data.token));
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  const handleFailure = (error) => {
    console.log(error);
    setIsError(true);
  };

  if (user.token) {
    return <Redirect to="/matches" />;
  }

  return (
    <div>
      <Menu
        handleBack={() => history.push("/")}
        registrationMenu={true}
        showBackButton={false}
      />
      <Container>
        <HeroWrapper>
          <StairsGreyBg>
            <StairsImage src={Stairs} />
          </StairsGreyBg>
          <OrderedSide>
            <TitleContainer>
              <HeroTitle>
                Find a mentor who can help guide you to success!
              </HeroTitle>
              <SignupNote>
                Currently open for designers, software professionals
              </SignupNote>
              <SignInContainer>
                <LinkedIn
                  clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
                  onFailure={handleFailure}
                  onSuccess={handleSuccess}
                  redirectUri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
                  scope="r_emailaddress r_liteprofile"
                  redirectPath="/register"
                >
                  <LinkedinImage src={LinkedinSignin} />
                </LinkedIn>
                <OrText> or </OrText>
                <Link to="/register">
                  <RegisterButton> Register </RegisterButton>
                </Link>
              </SignInContainer>
            </TitleContainer>
            {/* <WaitlistCard className={classes.WaitlistCard} /> */}
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
          style={{ backgroundColor: "#f5f3f8", padding: "50px 15px" }}
        >
          <div style={{ marginTop: 30, maxWidth: "300px" }}>
            <Typography className={classes.BodyHeader}>
              Why Open Mentorship?
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

        <FlexWrapper>
          <CheerWrapper>
            <CheerImage src={Cheer} />
          </CheerWrapper>
          <div>
            <CheerTitleBox>
              <Typography className={classes.BodyHeader}>
                Get on the path of your dream career with us today.
              </Typography>
            </CheerTitleBox>
            {/* <Link style={{ margin: "0 auto" }} to="/register">
              <RegisterButton>Register</RegisterButton>
            </Link> */}
            {/* <WaitlistCard className={classes.WaitlistCard} /> */}
          </div>
        </FlexWrapper>
      </Container>
      <Footer />
    </div>
  );
}
