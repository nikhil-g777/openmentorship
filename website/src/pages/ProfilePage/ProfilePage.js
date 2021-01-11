import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

//components
import AppMenu from "../../components/Layout/AppMenu";

//mui styling
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//mui icon
import PermIdentity from "@material-ui/icons/PermIdentity";
import WorkIcon from "@material-ui/icons/Work";

//mui components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

/*pull in user data and populate fields for the user to edit 
    fields required : 
    profile picture 
    first name
    last name
    education
    job experience
    skills

    Account Management page? since only doing linkedIn logins this isnt needed yet but will be here. 

    */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "100px",
      flexGrow: 1,
      width: "90%",
      margin: "0 auto",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    headerIcon: {
      float: `left`,
      padding: `15px`,
      marginTop: ` -60px`,
      marginRight: `15px`,
      borderRadius: `3px`,
      backgroundColor: `#4e96cb`,
      width: `70px`,
      height: `70px`,
      background: ` linear-gradient(60deg, #40a7ec, #5b6fd6)`,
      boxShadow: `0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgb(30 87 233 / 40%)`,
    },
    header: {
      flex: "unset",
    },
    headerTitle: {
      marginTop: "-15px",
    },

    button: {
      marginTop: "25px",
    },
    divider: { height: "120px" },
  })
);
export default function ProfilePage() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    Years: "",
    skills: "",
    company:"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('handleChange: updating state for ', name, "with value: ", value)
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //when user hits submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting data : state", state);
    axios.post("/users/update/{user._id}", state);
  };

  //run once, grab user profile data to prefill
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/users/info/user._id`)
        .then((response) => {
          setUserData({ ...response, isFetching: false });
          console.log("userData fetched", userData);
        })
        .catch((e) => {
          console.log("error fetching userData: ", e);
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      <AppMenu />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className={classes.paper}>
              <CardHeader
                classes={{ content: classes.header }}
                avatar={
                  <Avatar aria-label="recipe" className={classes.headerIcon}>
                    <PermIdentity />
                  </Avatar>
                }
                title={<h3 className={classes.headerTitle}>Edit Profile</h3>}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="First Name"
                    value={state.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Last Name"
                    value={state.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.divider} />
            <Paper className={classes.paper}>
              <CardHeader
                classes={{ content: classes.header }}
                avatar={
                  <Avatar aria-label="recipe" className={classes.headerIcon}>
                    <WorkIcon />
                  </Avatar>
                }
                title={<h3 className={classes.headerTitle}>Work Experience</h3>}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Company"
                    value={state.company}
                    onChange={handleChange}
                    name="company"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Job Title"
                    value={state.jobTitle}
                    onChange={handleChange}
                    name="jobTitle"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Years Worked"
                    value={state.years}
                    onChange={handleChange}
                    name="years"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Skills"
                    value={state.skills}
                    onChange={handleChange}
                    name="skills"
                  />
                </Grid>
              </Grid>
            </Paper>
            <form onSubmit={handleSubmit}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
