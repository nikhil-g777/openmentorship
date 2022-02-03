import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Box, Container, CircularProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Menu1 } from "../Component";

import SessionCard from "../Component/SessionCard/SessionCard";

import { getSessionsList } from "../../redux/Actions/DashboardActions";

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
  progressWrapper: {
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "56px!important",
      height: "56px!important",
    },
  },
}));

const Session = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTabs = (e, value) => {
    setActiveTab(value);
  };

  const dashboardState = useSelector((store) => store.dashboardreducer);

  useEffect(() => {
    const fetchSessions = async () => {
      await dispatch(getSessionsList());
    };

    if (
      dashboardState.activeSessions?.length === 0 ||
      dashboardState.closedSessions?.length === 0
    ) {
      fetchSessions();
    }
  }, []);

  return (
    <Box className={classes.backGroundNav}>
      <Box className={classes.navWrapper}>
        <Box className={classes.backGroundNav}>
          <Menu1 registrationMenu={true} showBackButton={false} />
        </Box>
        <Tabs
          centered
          value={activeTab}
          onChange={handleChangeTabs}
          indicatorColor="primary"
          className={classes.tabsRoot}
        >
          <Tab label="Active" />
          <Tab label="Closed" />
        </Tabs>
      </Box>
      <>
        {dashboardState.loading ? (
          <Box className={classes.progressWrapper}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeTab === 0 && (
              <SessionCard
                sessions={dashboardState.activeSessions}
                sessionType="Active"
                isSessionsPage={true}
              />
            )}
            {activeTab === 1 && (
              <SessionCard
                sessions={dashboardState.closedSessions}
                sessionType="Closed"
                isSessionsPage={true}
              />
            )}
          </>
        )}
      </>
    </Box>
  );
};

export default Session;
