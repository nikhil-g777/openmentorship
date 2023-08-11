import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Menu1 } from "../Component";

import SessionCard from "../Component/SessionCard/SessionCard";

import {
  getSessionsList,
  searchSessionsList,
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
  progressWrapper: {
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "56px!important",
      height: "56px!important",
    },
    "& > div > svg": {
      color: "#51b6a5",
    },
  },

  tabsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.8%",
    boxShadow: "4px 8px 8px rgb(201 199 199 / 25%)",
    padding: "21px 26px 8px",
  },
  sessionsText: {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0em",
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

const Session = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  const handleChangeTabs = (e, value) => {
    setActiveTab(value);
  };

  const dashboardState = useSelector((store) => store.dashboardreducer);

  useEffect(() => {
    if (
      dashboardState.activeSessions?.length === 0 ||
      dashboardState.closedSessions?.length === 0
    ) {
      fetchSessions();
    }
  }, []);

  const fetchSessions = async () => {
    await dispatch(getSessionsList());
  };

  const handleChangeSearch = (e) => {
    if (!e.target.value) {
      setSearch(e.target.value);
      fetchSessions();
    } else {
      setSearch(e.target.value);
      dispatch(searchSessionsList(e.target.value));
    }
  };

  const handleUserSearch = (e) => {
    if (e.key === "Enter") {
      console.log("search onEnter: ", search);
      dispatch(searchSessionsList(search));
    }
  };

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
        <Container>
          <Box className={classes.tabsBox}>
            <Box>
              <Typography className={classes.sessionsText}>
                {activeTab === 0 ? "Active" : "Closed"} Sessions
              </Typography>
            </Box>
            <Box className={classes.searchBox}>
              <Typography className={classes.searchText}>Search</Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="userID/Name"
                className={classes.search}
                onKeyPress={handleUserSearch}
                onChange={handleChangeSearch}
              />
            </Box>
          </Box>
        </Container>
        {dashboardState.loading ? (
          <Box className={classes.progressWrapper}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeTab === 0 && (
              <SessionCard sessions={dashboardState.activeSessions} />
            )}
            {activeTab === 1 && (
              <SessionCard sessions={dashboardState.closedSessions} />
            )}
          </>
        )}
      </>
    </Box>
  );
};

export default Session;
