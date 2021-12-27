import React, { useState } from "react";
import { Menu1 } from "../Component";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  MenuItem,
  Divider,
  Menu,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles, styled } from "@material-ui/core/styles";
// import {KeyboardArrowDownIcon} from '@material-ui/icons';
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import DatePicker from '@material-ui/lab/DatePicker';

import oval from "../../images/Oval.svg";

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
  BackGroundNav: {
    backgroundColor: "white",
  },
  Dashboard: {
    width: "100%",
    minHeight: 755,
    background: "#F6F6F7",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
  DashboardUpper: {
    padding: 100,
    "@media (max-width:780px)": {
      padding: 0,
    },
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "black",
    marginTop: 50,
    // theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));

export default function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [dashbordData, setDashbordData] = useState([
    { mentors: "99", description: "Total number of mentors" },
    { mentors: "99", description: "Total number of mentees" },
    { mentors: "99", description: "Active sessions" },
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.BackGroundNav}>
      <div className={classes.BackGroundNav}>
        <Container>
          <Menu1
            handleBack={() => history.push("/")}
            registrationMenu={true}
            showBackButton={false}
          />
        </Container>
      </div>
      <Container className={classes.DashboardUpper}>
        <Box className={classes.Dashboard}>
          <Box className={classes.FlexDashboard}>
            <Typography className={classes.title}>Dashboard</Typography>
            <Button
              id="demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              // aria-expanded={open ? 'true' : undefined}
              variant="contained"
              className={classes.FilterButton}
              disableElevation
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<MdOutlineArrowDropDown />}
            >
              Filters
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                Last 1 week
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Last 2 week
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Last 3 week
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Last 1 Month
              </MenuItem>
            </StyledMenu>
          </Box>

          <Grid container spacing={1}>
            {dashbordData?.map((x) => (
              <Grid item lg={4} xs={12} sm={12}>
                <Box className={classes.Cards}>
                  <Typography variant="h3">{x.mentors}</Typography>
                  <Typography variant="p">{x.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box className={classes.BackGroundNav} style={{ marginTop: 10 }}>
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
    </div>
  );
}
