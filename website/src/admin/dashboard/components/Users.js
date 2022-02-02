import React, { useState } from "react";

import {
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ProfileCard from "../../../components/ProfileCard/ProfileCard";

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    height: "26px",
    minHeight: "21px",
    alignItems: "center",
    "& .MuiTabs-flexContainer": {
      alignItems: "center",
    },
    "& .MuiButtonBase-root": {
      height: "25px",
      minHeight: "24px",
      zIndex: 1,
    },
    "& .MuiTab-wrapper": {
      color: "black",
      fontSize: "16px",
      fontWeight: 400,
      textTransform: "capitalize",
    },
    "& .MuiTabs-indicator": {
      height: "48px",
    },
    "& button:focus": {
      outline: "none",
    },
  },
  tabsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "7%",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    padding: "16px 27px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
  },
  searchText: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0em",
    marginRight: "14px",
  },
  search: {
    border: "1px solid #AEAEAE",
    margin: 0,
    "& .MuiInputBase-root": {
      borderRadius: 0,
    },
    "& input": {
      padding: "2px 6px",
      height: "21px",
    },
  },
  profile_container: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    marginTop: "8px",
  },
}));

const Users = (props) => {
  const classes = useStyles();
  const { mentors, mentees } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTabs = (e, value) => {
    setActiveTab(value);
  };

  return (
    <Container>
      <Box className={classes.tabsBox}>
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleChangeTabs}
            indicatorColor="primary"
            className={classes.tabsRoot}
          >
            <Tab label="Mentors" />
            <Tab label="Mentees" />
          </Tabs>
        </Box>
        <Box className={classes.searchBox}>
          <Typography className={classes.searchText}>Search</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="userID/Name"
            className={classes.search}
          />
        </Box>
      </Box>
      <Box>
        {activeTab === 0 &&
          mentors?.map((mentor) => (
            <Grid
              container
              key={mentor._id}
              className={classes.profile_container}
            >
              <ProfileCard data={mentor} isUserPage={true} />
            </Grid>
          ))}
        {activeTab === 1 &&
          mentees?.map((mentee) => (
            <Grid
              container
              key={mentee._id}
              className={classes.profile_container}
            >
              <ProfileCard data={mentee} isUserPage={true} />
            </Grid>
          ))}
      </Box>
    </Container>
  );
};
export default Users;
