import React, { useState } from "react";
import styled from "styled-components";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  NativeSelect,
  Grid,
  Input,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// additional packages
import "fontsource-roboto";

// local imports
import { registerWaitlist } from "../../api";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  CardTitle: {
    padding: "16px",
    width: "80%",
    maxWwidth: "300px",
    margin: "0 auto",
  },
  Title: {
    fontSize: 18,
    fontWeight: "Bold",
  },
  Note: {
    fontSize: 14,
  },
  FormControl: {
    width: "80%",
    maxMidth: "300px",
  },
  SpotsAvailable: {
    color: "#e53935",
    fontSize: 13,
    fontWeight: 10,
    marginTop: ".5em",
  },
  WaitlistCard: {
    maxWidth: 600,
    maxHeight: 400,
    backgroundColor: "#f5f3f8",
    padding: ".5em",
    margin: "0 auto",
  },
  WaitlistButton: {
    size: "medium",
    backgroundColor: "#51b6a5",
    height: 47,
    width: "100%",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: "proxima_nova",
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  margin-bottom: 3em;
  min-width: 343px;
`;

const TitleContainer = styled.div`
  width: 269px;
  height: 51px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const WaitlistButton = styled.button`
  background-color: #51b6a5;
  border-radius: 40px;
  border: 1px solid;
  border-color: #51b6a5;
  font-family: Proxima Nova;
  height: 47px;
  width: 80%;
  text-transform: none;
  margin-left: 10px;
  margin: 0 auto;
  margin-bottom: 1em;
  &:hover {
    background-color: #2d6c61;
  }
  &:active {
    background-color: #2d6c61;
  }
`;
export default function WaitlistCard(props) {
  const classes = useStyles();
  const [userType, setUserType] = useState("mentee");
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const joinWaitlist = () => {
    registerWaitlist({ waitlist: { userType, email } })
      .then((res) => {
        setWaitlistSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    setEmailValid(validateEmail(email));
  }, [email]);

  return (
    <div style={{ textAlign: "center" }}>
      <ThemeProvider theme={theme}>
        <Container>
          {/* <TitleContainer>
            <Typography className={classes.Title}>
              Let's build an OpenMentorship Community Together!
            </Typography>
          </TitleContainer> */}
          <Card className={classes.WaitlistCard} raised={true}>
            {waitlistSubmitted ? (
              <p>Thanks for Registering! We will get back to you soon</p>
            ) : (
              <>
                <CardContent className={classes.CardTitle}>
                  <Typography className={classes.Title}>
                    Be the first to be invited to the cohort starting soon
                  </Typography>
                  <Typography className={classes.SpotsAvailable}>
                    Limited spots available
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl className={classes.FormControl}>
                        <NativeSelect
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                          name="userType"
                          className={classes.selectEmpty}
                          inputProps={{ "aria-label": "userType" }}
                        >
                          <option value={"mentee"}>Join as a mentee</option>
                          <option value={"mentor"}>Join as a mentor</option>
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Input size="small" placeholder="Enter Your Email" inputProps={{ 'aria-label': 'email' }} /> */}
                      <TextField
                        size="small"
                        placeholder="Enter your email"
                        value={email}
                        className={classes.FormControl}
                        onChange={(e) => setEmail(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <WaitlistButton
                        variant="contained"
                        onClick={joinWaitlist}
                        disabled={emailValid ? false : true}
                      >
                        Join the Waitlist
                      </WaitlistButton>
                      <br />
                      <Typography className={classes.Note}>
                        Currently open for software, design
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </>
            )}
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}
