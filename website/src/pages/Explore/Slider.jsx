import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Grid, Button, Typography, Box ,Snackbar} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Alldata from "./Alldata";
import Alert from "@material-ui/lab/Alert";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createMatch } from "../../redux/Actions/MatchesActions";
import { getUserInfo } from "../../redux/Actions/UserActions";

const useStyles = makeStyles((theme) => ({
  progressWrapper: {
    // height: "80vh",
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
  profileWrapper: {
    backgroundColor: "#F1F4F4",
    paddingBottom: 50,
    paddingTop: 0,
    minHeight: "93vh",
  },
  // profile_container: {
  //   backgroundColor: "#F1F4F4",
  //   boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  //   padding: "42px 38px 37px 30px ",
  // },
  notFoundSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12%",
    color: "#161313",
    "& svg": {
      fontSize: "22px",
    },
  },
  notFoundText: {
    fontSize: "22px",
    fontWeight: "600",
  },
  Reconnevt: {
    backgroundColor: "#EFEFEF",
    borderRadius: "4px",
    padding: 30,
    height: "auto",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
  },
  Meghan: {
    fontSize: 22,
    lineHeight: "27px",
    fontWeight: "bold",
    marginBottom: 10,
  },
  mentor: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    marginTop:10
  },
  MessageArea: {
    height: 312,
    backgroundColor: "white",
    padding: 30,
    marginTop: 30,
  },
  MessageInput: {
    border: "none",
    width: "100%",
    padding: 20,
    marginTop: 20,
  },
  buttonFlex: {
    display: "flex",
    justifyContent: "flex-end",
  },
  BoxImage: {
    display: "block",
    "@media (max-width:780px)": {
      width: "117px",
      height: "120px",
    },
  },
  FlexImageBox: {
    display: "block",
    "@media (max-width:780px)": {
      display: "flex",
    },
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "column",
  },
  MobileRightGrid: {
    display: "none",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "27px",
    paddingLeft: 10,
    "@media (max-width:780px)": {
      display: "block",
    },
  },
  MobileSubHead: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
      color: "#6D6D6D",
      fontSize: "12px",
      lineHeight: "17px",
      fontWeight: "bold",
      paddingLeft: 10,
      width: "auto",
      opacity: 0.8,
      marginTop: 10,
    },
  },
  Connections: {
    display: "none",
    "@media (max-width:780px)": {
      display: "block",
      width: 29,
      height: 29,
      marginTop: 20,
      marginRight: 7,
    },
  },
  MessageButton1: {
    backgroundColor: "#51B6A5",
    border: "1px solid #51B6A5",
    borderRadius: 50,
    marginTop: 20,
    width: "141px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
    "@media (max-width:780px)": {
      width: "auto",
      minWidth: "102px",
      height: "29px",
    },
  },
  CancelButton: {
    backgroundColor: "transpernt",
    border: "none",
    borderRadius: 50,
    marginTop: 20,
    width: "141px",
    height: "40px",
    textTransform: "capitalize",
    fontWeight: "bold",
    "@media (max-width:780px)": {
      width: "auto",
      height: "29px",
      minWidth: "102px",
    },
  },
}));
export default function Slick({ data }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "#51B6A5",
          color: "#51B6A5",
          borderRadius: 50,
          fontSize: 40,
        }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "#51B6A5",
          color: "#51B6A5",
          borderRadius: 50,
        }}
        onClick={onClick}
      />
    );
  }
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  const dispatch = useDispatch();
  const classes = useStyles();

  const userState = useSelector((store) => store.userreducer);
  const [reconnect, setReconnect] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const { user } = userState;
  console.log(user, "userid");
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUserInfo());
    };
    if (user && Object.keys(userState?.user?.user || {}).length === 0) {
      fetchUser();
    }
  }, []);
  const handleRequest = async () => {
    if (message.length > 2000) {
      alert("Message length should be less than 2000 characters");
    } else {
      const data = {
        match: {
          menteeId: user.user._id,
          mentorId: selectedData._id,
          requestMessage: message,
        },
      };
      const response = await dispatch(createMatch(data));
      console.log(response, "response");
      if (response?.payload?.data?.success) {
        setErrorMessage("success");
        setSeverity("success")
        setOpen(true);
        setMessage("");
        setReconnect(false);
      } else {
        setErrorMessage(response?.payload?.response?.data?.error)
        setSeverity("error")
        setOpen(true);
        setMessage("");
        setReconnect(false);
      }
    }
  };
  const handleClose = () => {
    setReconnect(false);
    setMessage("");
  };
  return (
    <>
              <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity={severity}>
         {errorMessage}
        </Alert>
      </Snackbar>
      <Slider {...settings}>
        {/* <Grid container> */}
        {data?.map((elm) => (
          <Grid container className="m-top">
            <Grid container>
              <ProfileCard
                data={elm}
                isProfilePage={false}
                slide={true}
                isRequest={true}
                setSelectedData={setSelectedData}
                setReconnect={setReconnect}
              />
            </Grid>
          </Grid>
        ))}
        {/* </Grid> */}
      </Slider>

      <Modal
        open={reconnect}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        width={500}
      >
        <Box
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            padding: 40,
            width: "50%",
            margin: "auto",
            marginTop: "10%",
            borderRadius: 5,
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid lightgray",
              paddingBottom:10,
              marginTop:5
            }}
          >
            <Typography variant="h5">
              Send a request to {selectedData?.firstName}
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" className={classes.mentor}>
            Let {selectedData?.firstName} know why you want them as your mentor.{" "}
          </Typography>
          <textarea
            rows={10}
            placeholder="Type message here..."
            className={classes.MessageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Box className={classes.buttonFlex}>
            <Button
              className={classes.CancelButton}
              onClick={() => setReconnect(false)}
            >
              Cancel
            </Button>
            <Button className={classes.MessageButton1} onClick={handleRequest}>
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
