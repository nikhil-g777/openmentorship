import React from "react";
import Slider from "react-slick";
import { Grid, Container } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
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
          fontSize:40

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
  return (
    <Slider {...settings}>
      {/* <Grid container> */}
        {data?.map((elm) => (
          <Grid container className="m-top">
      <Grid container>

            <ProfileCard
              data={elm}
              isProfilePage={false}
              slide={true}
              // isRequest={true}
            />
          </Grid>
          </Grid>
        ))}
      {/* </Grid> */}
    </Slider>
  );
}
