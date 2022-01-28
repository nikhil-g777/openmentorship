import React from "react";

import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import oval from "../../../images/Oval.svg";

const data = [
  {
    name: "1",
    uv: 25,
    pv: 7,
    amt: 6,
  },
  {
    name: "5",
    uv: 23,
    pv: 10,
    amt: 6,
  },
  {
    name: "10",
    uv: 8,
    pv: 12,
    amt: 5,
  },
  {
    name: "15",
    uv: 7,
    pv: 14,
    amt: 5,
  },
  {
    name: "20",
    uv: 6,
    pv: 22,
    amt: 3,
  },
  {
    name: "25",
    uv: 6,
    pv: 18,
    amt: 3,
  },
  {
    name: "30",
    uv: 8,
    pv: 12,
    amt: 12,
  },
];

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "56px!important",
      height: "56px!important",
    },
  },
  BackGroundNav: {
    backgroundColor: "white",
    marginTop: 10,
  },
  Dashboard: {
    width: "100%",
    minHeight: 755,
    background: "#F6F6F7",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
  DashboardUpper: {
    padding: 21,
    // "@media (max-width:780px)": {
    //   padding: 0,
    // },
  },
  FlexDashboard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  FilterButton: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  Cards: {
    width: "100%",
    minHeight: "220px",
    backgroundColor: "white",
    textAlign: "center",
    paddingTop: "22%",
  },
  Visits: {
    paddingLeft: 15,
    opacity: 0.7,
    marginBottom: 15,
    fontSize: 15,
  },
  DatePickers: {
    border: "1px solid #51B6A5",
    borderRadius: 4,
    width: 116,
    color: "#11263C",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  return (
    <>
      {props.isLoading ? (
        <Box className={classes.progressWrapper}>
          <CircularProgress />
        </Box>
      ) : (
        <Container className={classes.DashboardUpper}>
          <Box className={classes.Dashboard}>
            <Box className={classes.FlexDashboard}>
              <Typography className={classes.title}>Dashboard</Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item lg={4} xs={12} sm={12}>
                <Box className={classes.Cards}>
                  <Typography variant="h3">
                    {props.stats?.mentorCount}
                  </Typography>
                  <Typography>Total number of mentors</Typography>
                </Box>
              </Grid>
              <Grid item lg={4} xs={12} sm={12}>
                <Box className={classes.Cards}>
                  <Typography variant="h3">
                    {props.stats?.menteeCount}
                  </Typography>
                  <Typography>Total number of mentees</Typography>
                </Box>
              </Grid>
              <Grid item lg={4} xs={12} sm={12}>
                <Box className={classes.Cards}>
                  <Typography variant="h3">
                    {props.stats?.matchCounts?.active}
                  </Typography>
                  <Typography>Active sessions</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box className={classes.BackGroundNav}>
              <Box className={classes.FlexDashboard}>
                <Typography variant="h6">Site traffic</Typography>
                <input
                  type="date"
                  className={classes.DatePickers}
                  defaultValue="12/12/2021"
                  format="Month dd"
                />
              </Box>
              <Typography variant="h6" className={classes.Visits}>
                Total visits <img src={oval} />{" "}
              </Typography>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                  width={500}
                  height={500}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
