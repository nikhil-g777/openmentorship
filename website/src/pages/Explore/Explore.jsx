import React, { useEffect, useState } from "react";
import Nav from "../../components/Layout/AppMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getexploredata,
  getexploredataByContent,
} from "../../redux/Actions/ExploreAction";
import "../../style/Explore.css";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Snackbar,
} from "@material-ui/core";
import Alldata from "./Alldata";
import filterOptions from "./filterOptions";
import Slider1 from "./Slider";
import Footer from "../../components/Footer";
import Slider from "react-slick";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import { createMatch } from "../../redux/Actions/MatchesActions";
import Alert from "@material-ui/lab/Alert";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  navWrapper: {
    marginBottom: "12px",
    display: "block",
    // "@media (max-width:780px)": {
    //   display: "none",
    // },
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
export default function Explore() {
  const data = useSelector((store) => store.Explorereducer.Explore);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const frequency = "communicationFrequency";
  const [mantorData, setMentorData] = useState([]);
  const [reconnect, setReconnect] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const userState = useSelector((store) => store.userreducer);
  const { user } = userState;

  const [findMentor, setFindMentor] = useState({
    areaOfInterest: [],
    goals: [],
    communicationFrequency: "",
    communicationPreferences: [],
  });
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    arrows: false,
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
  useEffect(() => {
    setMentorData(data.mentors);
  }, [data]);
  console.log(data, "data");
  const loading = useSelector((store) => store.Explorereducer.loading);
  useEffect(() => {
    if (
      findMentor.areaOfInterest !== [] ||
      findMentor.goals !== [] ||
      findMentor.communicationFrequency !== "" ||
      findMentor.communicationPreferences !== []
    ) {
      dispatch(getexploredataByContent(page, limit, findMentor));
      // window.scroll(0,0);
    } else {
      dispatch(getexploredata());
    }
  }, [
    findMentor.areaOfInterest,
    findMentor.goals,
    findMentor.communicationFrequency,
    findMentor.communicationPreferences,
    page,
  ]);

  const handleToggle = (text, type) => {
    if (type === frequency) {
      if (text === findMentor.communicationFrequency) {
        setFindMentor({
          ...findMentor,
          [type]: "",
        });
      } else {
        setFindMentor({
          ...findMentor,
          [type]: text,
        });
      }
    } else {
      if (
        findMentor.areaOfInterest.includes(text) ||
        findMentor.goals.includes(text) ||
        findMentor.communicationPreferences.includes(text)
      ) {
        const trimStr = findMentor[type].replace(text, "");
        console.log(trimStr, "trimstr");
        const strtrim = trimStr.slice(0, -1);
        console.log(strtrim, "strtrim");

        setFindMentor({
          ...findMentor,
          [type]: strtrim,
          // .replace(",", ""),
        });
      } else {
        const strVal = [findMentor[type], text].toString();
        setFindMentor({
          ...findMentor,
          [type]: strVal.replace(/^,|,$/g, ""),
        });
      }
    }
  };
  console.log(findMentor, "findMentor");
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleClose = () => {
    setReconnect(false);
    setMessage("");
  };
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
        setSeverity("success");
        setOpen(true);
        setMessage("");
        setReconnect(false);
      } else {
        setErrorMessage(response?.payload?.response?.data?.error);
        setSeverity("error");
        setOpen(true);
        setMessage("");
        setReconnect(false);
      }
    }
  };
  return (
    <div>
      {/* <Nav /> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity={severity}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.navWrapper}>
        <Container>
          <Nav showBackButton={false} />
        </Container>
      </Box>
      <div className="main">
        <Grid className="top" lg={12}>
          <Typography varianr="h1" className="text">
            Find your mentor
          </Typography>
        </Grid>
        <Container className="grid_center">
          <Grid lg={12}>
            <Typography varianr="h1" className="text-color">
              Filter <span className="span_text"> (hide)</span>
            </Typography>
          </Grid>
          <Grid className="items-center">
            <Grid container className="flex" lg={12}>
              {filterOptions.map((y, index) => (
                <Grid item className="jj" xs={6} sm={6} md={4} lg={3}>
                  <Grid className="change_color">
                    <Typography className="change_color" variant="p">
                      {y.key}
                    </Typography>

                    <div className="line" />
                    {console.log(y, "ee")}
                    <Grid lg={8} md={12} sm={12} xs={12} className="cen">
                      {y.values.map((x) => (
                        <Button
                          className={
                            findMentor.areaOfInterest.includes(x.text) ||
                            findMentor.goals.includes(x.text) ||
                            findMentor.communicationFrequency === x.text ||
                            findMentor.communicationPreferences.includes(x.text)
                              ? "bt"
                              : "round-button"
                          }
                          onClick={() => handleToggle(x.text, x.type)}
                        >
                          {x.name}
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
        {/* </div>

      <div className="main"> */}
        {/* <Container className="grid_center"> */}
        {/* <Grid lg={12}></Grid> */}
        <div className="mobile-nuull">
          <Container>
            {findMentor.areaOfInterest.length == 0 &&
            findMentor.goals.length == 0 &&
            findMentor.communicationFrequency === "" &&
            findMentor.communicationPreferences.length == 0 ? (
              <Grid container justify="center">
                {/* <Grid item lg={2}></Grid> */}
                <Grid item lg={12} sm={12}>
                  <Typography className="color_pro" style={{ marginTop: 50 }}>
                    Recommended based on your profile{" "}
                  </Typography>

                  <Slider1 data={data?.mentors} loading={loading} />
                </Grid>
              </Grid>
            ) : null}
          </Container>
        </div>
        <div className="mobile-view-slider-shown">
          <Container>
            {findMentor.areaOfInterest.length == 0 &&
            findMentor.goals.length == 0 &&
            findMentor.communicationFrequency === "" &&
            findMentor.communicationPreferences.length == 0 ? (
              <>
                <Typography className="color_pro" style={{ marginTop: 50 }}>
                  Recommended based on your profile{" "}
                </Typography>

                <Slider {...settings}>
                  {data?.mentors?.map((elm) => (
                    <Grid container className="m-top">
                      <ProfileCard
                        data={elm}
                        isRequest={true}
                        setSelectedData={setSelectedData}
                        setReconnect={setReconnect}
                      />
                    </Grid>
                  ))}
                </Slider>
              </>
            ) : null}
          </Container>
        </div>
        {/* </Container>
        </Container>
      </div> */}
        {/* <Container></Container> */}
        {/* <div className="main2"> */}
        {/* <Container className="grid_center"> */}
        <Alldata data={mantorData} loading={loading} />
        {/* </Container> */}
      </div>
      <div style={{ backgroundColor: "#F1F4F4" }}>
        <Container>
          <div className="pagination">
            <Pagination count={data.totalPages} onChange={handleChange} />
          </div>
        </Container>
      </div>
      <Modal
        open={reconnect}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            padding: 40,
            width: "95%",
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
              paddingBottom: 10,
              marginTop: 5,
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
      <div className="foter">
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
