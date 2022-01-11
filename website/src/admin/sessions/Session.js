import React, { useState } from "react";
import { Menu1 } from "../Component";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";
import "fontsource-roboto";
import SessionCard from "../Component/SessionCard/SessionCard";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tilte: {
    textAlign: "center",
    paddingTop: "2%",
    fontSize: "28px",
  },
  Background: {
    backgroundColor: "white",
    paddingBottom: "5%",
    paddingLeft: "18%",
    paddingRight: "18%",

    "@media (max-width:780px)": {
      paddingLeft: "0%",
      paddingRight: "0%",
    },
  },
  Navbar: {
    backgroundColor: "white",
    height: "60px",
    padding: 20,
    paddingLeft: "30%",
    paddingRight: "30%",
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",

    "@media (max-width:780px)": {
      padding: 25,
      paddingLeft: "10%",
      paddingRight: "10%",
    },
  },
  WebCard: {
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
  MobileCard: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
    },
  },
  FlexDashboard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    minHeight: 65,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 15,
  },
  FilterButton: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  Dashboard: {
    width: "100%",
    minHeight: 555,
    background: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

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
    marginTop: 100,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "black",
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: "white",
      },
    },
  },
}));

export default function Session(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [sessionType, setSessionType] = useState("Active");
  const [viewType, setViewType] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleType = (value) => {
    setSessionType(value);
  };

  const viewProfile = () => {
    setViewType(true);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: "white",
          }}
        >
          <Container>
            <Menu1
              handleBack={() => history.push("/")}
              registrationMenu={true}
              showBackButton={false}
            />
          </Container>
        </div>
        <div
          style={{ backgroundColor: "white", borderTop: "1px solid lightgrey" }}
        >
          <Container>
            <Box className={classes.Navbar}>
              <Typography
                variant="p"
                style={{ color: sessionType === "Active" ? "#51B6A5" : "" }}
                onClick={() => handleType("Active")}
              >
                Active
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: sessionType === "SessionClosed" ? "#51B6A5" : "",
                }}
                onClick={() => handleType("SessionClosed")}
              >
                Closed
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: sessionType === "SessionCurrent" ? "#51B6A5" : "",
                }}
                onClick={() => handleType("SessionCurrent")}
              >
                Current
              </Typography>
            </Box>
          </Container>
        </div>

        <Box className={classes.Background}>
          <Container>
            <Box className={classes.Dashboard}>
              <Box className={classes.FlexDashboard}>
                <Typography className={classes.title}>
                  {sessionType === "Active"
                    ? "Active sessions"
                    : sessionType === "SessionClosed"
                    ? "Closed sessions"
                    : "Current matching period"}
                </Typography>
                {sessionType === "SessionCurrent" ? null : (
                  <>
                    <Button
                      id="demo-customized-button"
                      aria-controls="demo-customized-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="contained"
                      className={classes.FilterButton}
                      disableElevation
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
                  </>
                )}
              </Box>

              {/* <Box className={classes.WebCard}> */}
              <SessionCard />
              {/* </Box> */}
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      {/* <div style={{backgroundColor:'#f5f3f8'}}>
        <Container>
      <Footer/>

        </Container>
      </div> */}
    </div>
  );
}
