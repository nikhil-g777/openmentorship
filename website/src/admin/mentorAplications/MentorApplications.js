import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getMentorApplications,
  updateMentorRegisteration,
} from "../../redux/Actions/MentorApplicationsActions";

import { Menu1 } from "../Component";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const useStyles = makeStyles((theme) => ({
  backgroundNav: {
    boxShadow: "0px 4px 4px rgb(151 151 151 / 25%)",
  },
  progressWrapper: {
    height: "40vh",
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
  tabsRoot: {
    // height: "26px",
    minHeight: "21px",
  },
  tabsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "7%",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    padding: "16px 27px",
  },
  applicationsText: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: " 0em",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
  },
  profile_container: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    marginTop: "8px",
  },
  sortButton: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "17px",
    letterSpacing: "0em",
    textTransform: "inherit",
    "&:focus": {
      outline: "none",
    },
  },

  paginationWrapper: {
    marginTop: "40px",
    marginBottom: "30px",
    "& ul": {
      justifyContent: "center",
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const MentorApplications = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const mentorApplicationsState = useSelector(
    (store) => store.mentorapplicationsreducer
  );

  useEffect(() => {
    setPageNumber(params.page);
    const fetchMentorApplications = async () => {
      await dispatch(getMentorApplications(Number(params.page)));
    };
    if (
      !mentorApplicationsState.mentorApplications?.users ||
      mentorApplicationsState.mentorApplications?.currentPage !== params.page
    ) {
      fetchMentorApplications();
    }
  }, [
    mentorApplicationsState.mentorApplications?.users?.length,
    Number(params.page),
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSnackbar = () => {
    setSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const handleApproveMentor = async (e, mentor) => {
    e.preventDefault();
    let data = {
      mentorId: mentor?._id,
      registrationStatus: "complete",
    };
    await dispatch(updateMentorRegisteration(data));
    handleOpenSnackbar();
  };

  const handleDenyMentor = async (e, mentor) => {
    e.preventDefault();
    let data = {
      mentorId: mentor?._id,
      registrationStatus: "denied",
    };
    await dispatch(updateMentorRegisteration(data));
    handleOpenSnackbar();
  };

  const handlePagination = (event, value) => {
    setPageNumber(value);
    history.push(`/admin/mentor-applications/${value}`);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={mentorApplicationsState?.mentorError ? "error" : "success"}
        >
          {mentorApplicationsState?.mentorError
            ? "Error updating status"
            : "Status updated succesfully!"}
        </Alert>
      </Snackbar>

      <Box className={classes.backgroundNav}>
        <Menu1
          registrationMenu={true}
          showBackButton={false}
          pageNumber={pageNumber}
        />
      </Box>

      <Container>
        <Box className={classes.tabsBox}>
          <Typography className={classes.applicationsText}>
            Mentor Applications
          </Typography>
          <Box className={classes.sortBox}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.sortButton}
            >
              Sort by{" "}
              <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "9px" }}
              >
                <path d="M4 7L0.535898 0.25L7.4641 0.25L4 7Z" fill="black" />
              </svg>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Name</MenuItem>
              <MenuItem onClick={handleClose}>ID</MenuItem>
              <MenuItem onClick={handleClose}>Date</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box>
          {mentorApplicationsState?.loading ? (
            <Box className={classes.progressWrapper}>
              <CircularProgress />
            </Box>
          ) : (
            mentorApplicationsState.mentorApplications?.users?.map((mentor) => (
              <Grid
                container
                key={mentor._id}
                className={classes.profile_container}
              >
                <ProfileCard
                  data={mentor}
                  isMentorApplicationPage={true}
                  handleApproveMentor={(e) => handleApproveMentor(e, mentor)}
                  handleDenyMentor={(e) => handleDenyMentor(e, mentor)}
                />
              </Grid>
            ))
          )}
        </Box>
        {mentorApplicationsState?.mentorApplications?.users?.length > 0 ? (
          <Box className={classes.paginationWrapper}>
            <Pagination
              count={mentorApplicationsState?.mentorApplications?.totalPages}
              page={Number(pageNumber)}
              onChange={handlePagination}
            />
          </Box>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};
export default MentorApplications;
