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
    marginTop: -20,
    border: "1px solid #BCBBBF",
    height: 43,
    borderRadius: 5,
    paddingLeft: 12,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  CardTitle: {
    // padding: "16px",
    width: "100%",
    // maxWwidth: "300px",
    // margin: "0 auto",
  },
  Title: {
    fontSize: 14,
    fontWeight: "normal",
  },
  Note: {
    fontSize: 14,
  },
  FormControl: {
    width: "100%",
    // maxMidth: "300px",
    padding: 5,
  },
  SpotsAvailable: {
    color: "#B80000",
    fontSize: 11,
    fontWeight: "normal",
    marginTop: ".5em",
    opacity: 0.5,
  },
  WaitlistCard: {
    maxWidth: 600,
    maxHeight: 400,
    backgroundColor: "#f5f3f8",
    padding: ".1em",
    margin: "0 auto",
    '@media (max-width:780px)': {
      width:320,
      marginLeft:-10
      
    }
  },
  WaitlistButton: {
    size: "small",
    backgroundColor: "#51b6a5",
    height: 35,
    width: "100%",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
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
  // font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  height: 40px;
  width: 238px;
  text-transform: none;
  margin-left: 10px;
  margin: 0 auto;
  margin-bottom: 1em;
  color: black;
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
    <div>
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
                    Be the first to be invited to our Openmentorship cohort
                    starting soon, join the waitlist today!{" "}
                  </Typography>
                  <Typography className={classes.SpotsAvailable}>
                    Limited spots available
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={0}>
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
                                           style={{
                                            color: "#5C5C5C",
                                          }}
                        // style={{height:40}}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Enter Your Adress Email"
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
                        Join the waitlist{" "}
                      </WaitlistButton>
                      {/* <br />
                      <Typography className={classes.Note}>
                        Currently open for software, design
                      </Typography> */}
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
