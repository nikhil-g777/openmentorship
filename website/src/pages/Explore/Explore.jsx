import React, { useEffect, useState } from "react";
import Nav from "../../components/Layout/AppMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getexploredata,
  getexploredataByContent,
} from "../../redux/Actions/ExploreAction";
import "../../style/Explore.css";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import Alldata from "./Alldata";
import filterOptions from "./filterOptions";

export default function Explore() {
  const data = useSelector((store) => store.Explorereducer.Explore);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [toggle, setToggle] = useState(false);
  const [subAreaOfInterest, setSubAreaOfInterest] = useState();
  const [subGoals, setSubGoals] = useState();
  const [subFrequency, setSubFrequency] = useState();
  const [subPrefernce, setSubPrefernce] = useState();
  const [mantorData, setMentorData] = useState([]);
  const [findMentor, setFindMentor] = useState({
    areaOfInterest: "",
    goals: "",
    communicationFrequency: "",
    communicationPreferences: "",
  });

  useEffect(() => {
    setMentorData(data);
  }, [data]);

  const loading = useSelector((store) => store.Explorereducer.loading);
  useEffect(() => {
    if (
      findMentor.areaOfInterest !== "" ||
      findMentor.goals !== "" ||
      findMentor.communicationFrequency !== "" ||
      findMentor.communicationPreferences !== ""
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
  console.log("1111", mantorData);

  const handleToggle = (id, text, type) => {
    console.log(id, text, type);
    if (type === "areaOfInterest") {
      console.log("id", id, "subAreaOfInterest", subAreaOfInterest);
      //   if (id === subAreaOfInterest) {
      //     setSubAreaOfInterest("");
      //     setFindMentor({
      //       ...findMentor,
      //       areaOfInterest: "",
      //     });
      //   } else {
      //     setSubAreaOfInterest(id);
      //     setFindMentor({
      //       ...findMentor,
      //       areaOfInterest: text,
      //     });
      //   }
      // } else if (type === "goals") {
      //   if (id === subGoals) {
      //     setSubGoals("");
      //     setFindMentor({
      //       ...findMentor,
      //       goals: "",
      //     });
      //   } else {
      //     setSubGoals(id);
      //     setFindMentor({
      //       ...findMentor,
      //       goals: text,
      //     });
      //   }
      // } else if (type === "frequency") {
      //   if (id === subFrequency) {
      //     setSubFrequency("");
      //     setFindMentor({
      //       ...findMentor,
      //       communicationFrequency: "",
      //     });
      //   } else {
      //     setSubFrequency(id);
      //     setFindMentor({
      //       ...findMentor,
      //       communicationFrequency: text,
      //     });
      //   }
      // } else {
      //   if (id === subPrefernce) {
      //     setSubPrefernce("");
      //     setFindMentor({
      //       ...findMentor,
      //       communicationPreferences: "",
      //     });
      //   } else {
      //     setSubPrefernce(id);
      //     setFindMentor({
      //       ...findMentor,
      //       communicationPreferences: text,
      //     });
      //   }
      // }

      // if (id === selectedItem) {
      //   setSelectedItem();
      //   // setToggle(false);
      // } else {
      //   setSelectedItem(id);
      //   if (!toggle === true) {
      //     setToggle(true);
      //   }
      // }
      // const index = subCategoryId.indexOf(id);
      // if (index > -1) {
      //   let newArray = subCategoryId.filter((idd) => idd !== id);
      //   setSubCategoryId(newArray);
      // } else {
      //   setSubCategoryId([...subCategoryId, id]);
    }
  };

  console.log("Object.keys", Object.keys(filterOptions));
  console.log("Object.values", Object.values(filterOptions));

  // for(let i=0; Object.keys(filterOptions).length; i++){
  //   console.log("HI FROM: ", Object.keys(filterOptions))
  // }

  const areaInterest = [
    { id: 101, name: "Software", type: "areaOfInterest", text: "software" },
    { id: 102, name: "Design", type: "areaOfInterest", text: "design" },
  ];
  const goals = [
    { id: 103, name: "Career Advice", type: "goals", text: "careerAdvice" },
    { id: 104, name: "Resume Review", type: "goals", text: "resumeReview" },
    { id: 114, name: "Mock Interview", type: "goals", text: "mockInterview" },
    { id: 105, name: "Project Review", type: "goals", text: "projectReview" },
    { id: 115, name: "Collaboration", type: "goals", text: "collaboration" },
    {
      id: 115,
      name: "Business Advice ",
      type: "goals",
      text: "businessAdvice",
    },

    {
      id: 107,
      name: "Skill ",
      type: "goals",
      text: "skillDevelopment",
    },
  ];
  const frequency = [
    { id: 108, name: "Weekly", type: "frequency", text: "weekly" },
    { id: 109, name: "Bi-weekly", type: "frequency", text: "biweekly" },
    { id: 110, name: "Once a month", type: "frequency", text: "onceamonth" },
  ];
  const prefernces = [
    { id: 111, name: "phone call", type: "prefernces", text: "phoneCall" },
    { id: 112, name: "video call", type: "prefernces", text: "videoCall" },
    {
      id: 113,
      name: "chat or message",
      type: "prefernces",
      text: "chatOrMessaging",
    },
  ];

  return (
    <div>
      <Nav />
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
          <div style={{ marginLeft: 40, marginRight: 40 }}>
            <Grid className="items-center">
              <Grid container className="flex" lg={12}>
                {filterOptions.map((y, index) => (
                  <Grid item className="jj" xs={6} sm={6} md={4} lg={3}>
                    <Grid className="change_color">
                      <Typography className="change_color" variant="p">
                        {y.key}
                      </Typography>

                      <div className="line" />
                      {console.log(y,"ee")}
                      <Grid lg={8} md={12} sm={12} xs={12} className="cen">
                        {y.values.map((x) => (
                          <Button
                            className={
                              subAreaOfInterest === x.id ? "bt" : "round-button"
                            }
                            onClick={() => handleToggle(x.id, x.text, x.type)}
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
          </div>
        </Container>
      </div>

      {/* <div className="main">
        <Container className="grid_center">
          <Grid lg={12}></Grid>
          <Container>
            <Slider data={data} />
          </Container>
        </Container>
      </div> */}
      {/* <Container></Container> */}
      <div className="main2">
        <Container className="grid_center">
          <Typography
            className="color_pro"
            style={{ marginLeft: 50, fontSize: "28px" }}
          >
            Recommended based on your profile
          </Typography>
          <Alldata data={mantorData} loading={loading} />
        </Container>
      </div>
    </div>
  );
}

{
  /* <Grid item className="jj" mt={5} xs={6} sm={6} md={4} lg={3}>
                  <Grid className="change_color">
                    <Typography variant="p" className="change_color">
                      Goals
                    </Typography>
                    <div className="line"></div>

                    <Grid lg={8} md={12} sm={12} xs={12} className="cen">
                      {goals.map((x) => (
                        <Button
                          className={subGoals === x.id ? "bt" : "round-button"}
                          onClick={() => handleToggle(x.id, x.text, x.type)}
                        >
                          {x.name}
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                </Grid> */
}
{
  /* <Grid item className="jj " mt={5} xs={6} sm={6} md={4} lg={3}>
                  <Grid className="change_color">
                    <Typography variant="p" className="change_color">
                      Frequency
                    </Typography>
                    <div className="line"></div>

                    <Grid lg={8} md={12} sm={12} xs={12} className="cen">
                      {frequency.map((x) => (
                        <Button
                          className={
                            subFrequency === x.id ? "bt" : "round-button"
                          }
                          onClick={() => handleToggle(x.id, x.text, x.type)}
                        >
                          {x.name}
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                </Grid> */
}
{
  /* <Grid item className="jj" mt={5} xs={6} sm={6} md={4} lg={3}>
                  <Grid className="change_color">
                    <Typography variant="p" className="change_color">
                      Preferences
                    </Typography>
                    <div className="line"></div>
                    <Grid lg={8} md={12} sm={12} xs={12} className="cen">
                      {prefernces.map((x) => (
                        <Button
                          className={
                            subPrefernce === x.id ? "bt" : "round-button"
                          }
                          onClick={() => handleToggle(x.id, x.text, x.type)}
                        >
                          {x.name}
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                </Grid> */
}
