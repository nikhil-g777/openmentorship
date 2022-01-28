import React, { useState } from "react";

import {
  Box,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Mentors from "./Mentors";
import Mentees from "./Mentees";

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
}));

const Users = (props) => {
  console.log("props: ", props);
  const classes = useStyles();
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

          {activeTab === 0 && <Mentors />}
          {activeTab === 1 && <Mentees />}
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
    </Container>
  );
};
export default Users;
