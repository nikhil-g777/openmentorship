import React, { useState } from "react";

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

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Title: {
    fontSize: 18,
  },
  SpotsAvailable: {
    color: "#e53935",
    fontSize: 13,
    fontWeight: 10,
  },
  WaitlistCard: {
    maxWidth: 600,
    maxHeight: 400,
    backgroundColor: "#f5f3f8",
  },
  WaitlistButton: {
    size: "medium",
    backgroundColor: "#51b6a5",
    height: 47,
    width: 343,
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function WaitlistCard(props) {
  const classes = useStyles();
  const [userType, setUserType] = useState("mentee");
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const joinWaitlist = () => {
    registerWaitlist({ waitlist: { userType, email } })
      .then((res) => {
        setWaitlistSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThemeProvider theme={theme}>
        <Card className={classes.WaitlistCard} raised={true}>
          {waitlistSubmitted ? (
            <p>Thanks for Registering ! We will get back to you soon</p>
          ) : (
            <>
              <CardContent>
                <Typography className={classes.Title}>
                  Be the first to be invited to first cohort starting soon
                </Typography>
                <Typography className={classes.SpotsAvailable}>
                  Limited spots available
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl>
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
                      onChange={(e) => setEmail(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className={classes.WaitlistButton}
                      onClick={joinWaitlist}
                    >
                      Join the Waitlist
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </>
          )}
        </Card>
      </ThemeProvider>
    </div>
  );
}
