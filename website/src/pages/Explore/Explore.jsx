import React, { useEffect, useState } from "react";
import Nav from "../../components/Layout/AppMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getexploredata,
  getexploredataByContent,
} from "../../redux/Actions/ExploreAction";
import "../../style/Explore.css";
import { Container, Typography, Grid, Button,Box } from "@material-ui/core";
import Alldata from "./Alldata";
import filterOptions from "./filterOptions";
import Slider1 from "./Slider";
import Footer from "../../components/Footer";
import Slider from "react-slick";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  makeStyles,
} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  navWrapper: {
    marginBottom: "12px",
    display: "block",
    "@media (max-width:780px)": {
      display: "none",
    },
  },
}))
export default function Explore() {
  const data = useSelector((store) => store.Explorereducer.Explore);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [limit] = useState(10);
  const [page] = useState(1);
  const frequency = "communicationFrequency";
  const [mantorData, setMentorData] = useState([]);
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
    arrows:false,
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
    setMentorData(data);
  }, [data]);

  const loading = useSelector((store) => store.Explorereducer.loading);
  useEffect(() => {
    if (
      findMentor.areaOfInterest !== [] ||
      findMentor.goals !== [] ||
      findMentor.communicationFrequency !== "" ||
      findMentor.communicationPreferences !== []
    ) {
      dispatch(getexploredataByContent(page, limit, findMentor));
    } else {
      dispatch(getexploredata());
    }
  }, [
    findMentor.areaOfInterest,
    findMentor.goals,
    findMentor.communicationFrequency,
    findMentor.communicationPreferences,
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

  return (
    <div>
      {/* <Nav /> */}
            <Box className={classes.navWrapper}>
        <Container>
       <Nav
       showBackButton={false} />

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
                              findMentor.communicationPreferences.includes(
                                x.text
                              )
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
      findMentor.communicationPreferences.length == 0 ?
        <Grid container justify="center">
          {/* <Grid item lg={2}></Grid> */}
          <Grid item lg={12} sm={12}>
            <Typography className="color_pro" style={{marginTop:50}}>
              Recommended based on your profile{" "}
            </Typography>

            <Slider1 data={data} loading={loading} />
          </Grid>
        </Grid>
        :
        null
        }

        
        </Container>
        </div>
        <div className="mobile-view-slider-shown">

        <Container>
        <Typography className="color_pro" style={{marginTop:50}}>
              Recommended based on your profile{" "}
            </Typography>
        <Slider {...settings}>
                     {data?.map((elm) => (
                      <Grid container className="m-top">
                        <ProfileCard
                          data={elm}
                          isRequest={true}
                        />
                      </Grid>
                    ))}
        </Slider>
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
      <div className="foter">
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
