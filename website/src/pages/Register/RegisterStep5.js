import React, { useEffect } from "react";
import { InputLabel, TextField } from "@material-ui/core";

import { Container, DotStepper, Title, TitleWrapper } from "../../components";
import { getUserInfo, updateUser } from "../../redux/Actions/UserActions";
// import { updateUser } from "../../api";
// import { UserContext } from "../../context/UserContext";

import { useDispatch, useSelector } from "react-redux";

const RegisterStep5 = (props) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useContext(UserContext);

  // useEffect(async () => {
  //   if (Object.keys(userState.user).length === 0) {
  //     await dispatch(getUserInfo());
  //   }
  // }, []);

  const userState = useSelector((store) => store.userreducer);

  async function handleUpdateUser() {
    console.log("user in handleUpdateUser: ", userState);
    console.log("values to update: ", props.values);
    await dispatch(
      updateUser({
        type: "completeRegistration",
        // _id: userState?.user?.user?._id,
        register: true,
        user: {
          headline: props.values.headline,
          bio: props.values.bio,
          userType: props.values.userType,
          careerStatus: props.values.careerStatus,
          areasOfInterest: props.values.areasOfInterest,
          experiences: props.values.experiences,
          education: props.values.education,
          skills: props.values.skills,
          interests: props.values.interests,
          goals: props.values.goals,
          communicationFrequency: props.values.communicationFrequency,
          communicationPreferences: props.values.communicationPreferences,
          socialLinks: props.values.socialLinks,

          // firstName: props.values.firstName,
          // lastName: props.values.lastName,
          // email: props.values.email,

          // active: false,
        },
      })
    );
    if (userState.isUserUpdated) {
      props.handleNext();
    }
    // .then((response) => {
    //   props.handleNext();
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
  const socialOptions = [
    "Twitter",
    "Medium",
    "Behance",
    "Github",
    "Portfolio",
    "Other",
  ];
  return (
    <Container>
      <TitleWrapper>
        <Title>Lastly, add your social media links to your profile.</Title>
      </TitleWrapper>
      {socialOptions.map((item) => {
        return (
          <>
            <InputLabel
              htmlFor="component-simple"
              style={{ fontWeight: 800, color: "#000" }}
            >
              {item}
            </InputLabel>
            <TextField
              variant="outlined"
              fullWidth={true}
              type="text"
              name={item}
              defaultValue={props.values.socialLinks[item]}
              placeholder="https://"
              onChange={props.handlesocialLinks}
            />
          </>
        );
      })}
      <DotStepper
        activeStep={4}
        handleNext={handleUpdateUser}
        positionBottom={true}
      />
    </Container>
  );
};

export default RegisterStep5;
