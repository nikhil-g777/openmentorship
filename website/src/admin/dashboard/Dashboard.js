import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Menu1 } from "../Component";
import Analytics from "./components/Analytics";
import Users from "./components/Users";

import {
  getDashboardStats,
  getUsersList,
} from "../../redux/Actions/DashboardActions";

const useStyles = makeStyles((theme) => ({
  backGroundNav: {
    backgroundColor: "white",
  },
  navWrapper: {
    boxShadow: "0px 4px 5px rgb(0 0 0 / 10%)",
  },
  tabsRoot: {
    height: "84px",
    alignItems: "center",
    "& .MuiTab-wrapper": {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "27px",
      letterSpacing: "0em",
      textTransform: "capitalize",
    },
    "& button:focus": {
      outline: "none",
    },
    "& .Mui-selected": {
      color: "#51B6A5",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
}));

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTabs = (e, value) => {
    setActiveTab(value);
  };

  const dashboardState = useSelector((store) => store.dashboardreducer);

  useEffect(() => {
    const fetchStats = async () => {
      await dispatch(getDashboardStats());
    };
    const fetchUsersList = async () => {
      await dispatch(getUsersList());
    };
    if (
      dashboardState.stats &&
      Object.keys(dashboardState.stats).length === 0
    ) {
      fetchStats();
    }
    if (
      dashboardState.mentorsList?.length === 0 ||
      dashboardState.menteesList?.length === 0
    ) {
      fetchUsersList();
    }
  }, []);

  return (
    <Box className={classes.backGroundNav}>
      <Box className={classes.navWrapper}>
        <Box className={classes.backGroundNav}>
          <Menu1
            handleBack={() => history.push("/")}
            registrationMenu={true}
            showBackButton={false}
          />
        </Box>
        <Tabs
          centered
          value={activeTab}
          onChange={handleChangeTabs}
          indicatorColor="primary"
          className={classes.tabsRoot}
        >
          <Tab label="Analytics" />
          <Tab label="Users" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <Analytics
          stats={dashboardState.stats}
          isLoading={dashboardState.loading}
        />
      )}
      {activeTab === 1 && (
        <Users
          mentors={dashboardState.mentorsList}
          mentees={dashboardState.menteesList}
        />
      )}
    </Box>
  );
};

export default Dashboard;
