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
  };
  return (
    <Slider {...settings}>
      {data?.map((elm) => (
        <Container className="grid_center">
          <Grid container className="m-top">
            <ProfileCard data={elm} isProfilePage={false} slide={true}/>
          </Grid>
        </Container>
      ))}
    </Slider>
  );
}
