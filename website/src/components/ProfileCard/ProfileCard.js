import React from "react";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import "fontsource-roboto";

//images
import twitterIcon from "../../images/image 23.png";
import mediumIcon from "../../images/image 24.png";
import githubIcon from "../../images/github-logo.png";
import behanceIcon from "../../images/behance-logo.png";
import portfolioIcon from "../../images/portfolio-icon.png";
import otherIcon from "../../images/other-icon.png";
import linked from "../../images/image 16.png";
import editIcon from "../../images/edit 1.png";
import boxImage from "../images/imagebox.png";

const useStyles = makeStyles((theme) => ({
  profile_img: {
    borderRadius: "5px",
    width: "191px",
    height: "191px",
    [theme.breakpoints.down("sm")]: {
      width: "117px",
      height: "120px",
    },
  },
  userDataWrapper: {
    marginTop: "10px",
    marginLeft: "44px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  pro_typo1: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "27px",
  },
  pro_typo2: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    linHeight: "27px",
    color: "#6D6D6D",
    marginTop: "10px",
  },
  pro_typo3: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "27px",
    marginTop: "25px",
  },
  pro_typo4: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "27px",
    marginTop: "10px",
  },
  pro_typo_btn: {
    backgroundColor: "#F1F1F1",
    borderRadius: "4px",
    textAlign: "center",
    padding: "8px",
    fontSize: "13px",
    textTransform: "capitalize",
  },
  social_div: {
    marginTop: "15px",
  },
  pro_typo_div: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },
  pro_typo_div_main: {
    display: "flex",
    justifyContent: "space-between",
  },
  pro_typo_div2: {
    display: "flex",
    alignItems: "center",
  },
  edit_txt: {
    color: "#51B6A5 ",
    textDecoration: "underline",
    fontSize: "16px",
    marginLeft: "10%",
  },
  pro_typo1_sm: {
    display: "none",

    [theme.breakpoints.down("sm")]: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "27px",
      display: "block",
      marginTop: "4%",
    },
  },
  img_div_xs: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  logoIcons: {
    width: "32px",
    height: "32px",
    marginRight: "12px",
  },
  // userInfoWrapper: {
  //   marginTop: "25px",
  // },
  emailButton: { border: "1px solid #51B6A5" },
  accountButton: { border: "1px solid #6D6D6D", marginTop: "11px" },
  buttonsText: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "19px",
    letterSpacing: "0em",
    textAlign: "center",
    padding: "10px",
    borderRadius: "40px",
    textTransform: "inherit",
    width: "-webkit-fill-available",
    "&:focus": {
      outline: "none",
    },
  },
  userInfoWrapper: {
    marginTop: "37px",
  },
  userTextWrapper: {
    display: "flex",
    marginBottom: "8px",
  },
  userInfoText: {
    fontSize: "14.5px",
    fontWeight: 500,
    lineHeight: "19px",
    letterSpacing: "0em",
    whiteSpace: "pre",
    minWidth: "65px",
    textAlign: "end",
  },
  userInfo: {
    marginLeft: "19px",
    textAlign: "left",
    wordBreak: "break-all",
    whiteSpace: "break-spaces",
  },
}));

const ProfileCard = (props) => {
  const classes = useStyles();
  const {
    data,
    isUserPage,
    isMentorApplicationPage,
    handleApproveMentor,
    handleDenyMentor,
  } = props;

  const handleSendEmail = () => {
    console.log("Send Email");
  };

  const handleDisableAccount = () => {
    console.log("Account Disable");
  };

  return (
    <>
      <Grid item xs={12} md={2} lg={2} style={{ marginTop: "10px" }}>
        <Box component="div" className={classes.img_div_xs}>
          <img
            className={classes.profile_img}
            src={
              data?.profileImageUrls?.default
                ? data.profileImageUrls.default
                : boxImage
            }
            alt=""
          />
          <Link
            to={
              isUserPage || isMentorApplicationPage
                ? `/admin/user-profile/${data?._id}`
                : "#"
            }
          >
            <Typography className={classes.pro_typo1_sm}>
              {`${data?.firstName} ${data?.lastName}`}
            </Typography>
          </Link>
          {isUserPage || isMentorApplicationPage ? (
            <Box className={classes.userInfoWrapper}>
              <Box>
                <Button
                  variant="outlined"
                  className={`${classes.emailButton} ${classes.buttonsText}`}
                  onClick={isUserPage ? handleSendEmail : handleApproveMentor}
                >
                  {isUserPage ? "Send email" : "Approve"}
                </Button>
                <Button
                  variant="outlined"
                  className={`${classes.accountButton} ${classes.buttonsText}`}
                  onClick={isUserPage ? handleDisableAccount : handleDenyMentor}
                >
                  {isUserPage ? "Disable account" : "Deny"}
                </Button>
              </Box>
              <Box className={classes.userInfoWrapper}>
                <Box className={classes.userTextWrapper}>
                  <Typography className={classes.userInfoText}>
                    User ID #:
                  </Typography>
                  <Typography
                    className={`${classes.userInfo} ${classes.userInfoText}`}
                  >
                    {data?._id}
                  </Typography>
                </Box>

                {isUserPage ? (
                  <>
                    <Box className={classes.userTextWrapper}>
                      <Typography className={classes.userInfoText}>
                        Joined on:
                      </Typography>
                      <Typography
                        className={`${classes.userInfo} ${classes.userInfoText}`}
                      >
                        {new Date(data?.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box className={classes.userTextWrapper}>
                      <Typography className={classes.userInfoText}>
                        User type:
                      </Typography>
                      <Typography
                        className={`${classes.userInfo} ${classes.userInfoText}`}
                      >
                        {data?.userType}
                      </Typography>
                    </Box>
                    <Box className={classes.userTextWrapper}>
                      <Typography className={classes.userInfoText}>
                        Email:
                      </Typography>
                      <Typography
                        className={`${classes.userInfo} ${classes.userInfoText}`}
                      >
                        {data?.email}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box className={classes.userTextWrapper}>
                    <Typography className={classes.userInfoText}>
                      Applied on:
                    </Typography>
                    <Typography
                      className={`${classes.userInfo} ${classes.userInfoText}`}
                    >
                      {new Date(data?.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Grid>
      <Grid item xs={12} lg={9} md={9} className={classes.userDataWrapper}>
        <Box component="div" className={classes.pro_typo_div_main}>
          <Box component="div" className={classes.pro_typo_div}>
            <Link
              to={
                isUserPage || isMentorApplicationPage
                  ? `/admin/user-profile/${data?._id}`
                  : "#"
              }
            >
              <Typography className={classes.pro_typo1}>
                {`${data?.firstName} ${data?.lastName}`}
              </Typography>
            </Link>
            <img src={linked} alt="" style={{ marginLeft: 10 }} />
          </Box>
          {props.isProfilePage ? (
            <Link to="/edit-profile" className={classes.editProfileLink}>
              <Box component="div" className={classes.pro_typo_div2}>
                <img src={editIcon} alt="" width="23px" height="23px" />
                <Typography className={classes.edit_txt}>Edit</Typography>
              </Box>
            </Link>
          ) : (
            ""
          )}
        </Box>
        <Typography className={classes.pro_typo2}>{data?.headline}</Typography>
        <Typography className={classes.pro_typo3}>About</Typography>
        <Typography className={classes.pro_typo4}>{data?.bio}</Typography>
        <Typography className={classes.pro_typo3}>Areas of interest</Typography>
        <Typography className={classes.pro_typo4}>
          {data?.interests?.map((interest, i) => (
            <span key={i}>{interest},</span>
          ))}
        </Typography>
        <Typography className={classes.pro_typo3}>Top skills</Typography>
        <Typography className={classes.pro_typo4}>
          {data?.skills?.map((skill, i) => (
            <span key={i}>{skill},</span>
          ))}
        </Typography>
        <Typography className={classes.pro_typo3}>Looking for</Typography>
        <Grid item container spacing={1} style={{ marginTop: "10px" }}>
          {Object.keys(data || {}).length > 0 &&
            Object.entries(data?.goals).map(([key, value]) => (
              <Grid item key={key}>
                {value && (
                  <Typography className={classes.pro_typo_btn}>
                    {key}
                  </Typography>
                )}
              </Grid>
            ))}
        </Grid>
        <Typography className={classes.pro_typo3}>Social Media</Typography>
        <Box component="div" className={classes.social_div}>
          {Object.keys(data || {}).length > 0 &&
            Object.entries(data?.socialLinks || {}).map(([key, value]) => (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                key={key}
              >
                {value && (
                  <img
                    src={
                      `${key}` === "Twitter"
                        ? twitterIcon
                        : key === "Medium"
                        ? mediumIcon
                        : key === "Behance"
                        ? behanceIcon
                        : key === "Github"
                        ? githubIcon
                        : key === "Portfolio"
                        ? portfolioIcon
                        : key === "Other"
                        ? otherIcon
                        : ""
                    }
                    alt=""
                    className={classes.logoIcons}
                  />
                )}
              </a>
            ))}
        </Box>
      </Grid>
    </>
  );
};

export default ProfileCard;
