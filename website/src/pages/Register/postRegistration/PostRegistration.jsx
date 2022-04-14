// import React, { useContext, useState, useEffect } from "react";
// // import axios from "axios";
// import { Redirect, withRouter } from "react-router-dom";

// import {
//   Button,
//   BackArrowTop,
//   BackArrowBottom,
//   Wrapper,
//   PictureTextWrapper,
//   TitleText,
//   BodyText,
//   PictureText,
//   MailPicture,
//   HumansPicture,
//   PenPaperPicture,
//   MagnifyPicture,
//   HandShakePicture,
//   AirplanePicture,
//   ThumbsUpPicture,
//   ConfirmationTitle,
//   ConfirmationText,
//   ButtonText,
//   ContentWrapper,
//   ButtonWrapper,
//   WaitTitle,
//   WaitText,
// } from "./PostRegistrationStyling";
// import { Container, TitleWrapper, Title } from "../../../components";

// import { getUserInfo, updateUser } from "../../../redux/Actions/UserActions";
// // import { updateUser } from "../../../api";
// // import { UserContext } from "../../../context/UserContext";

// import { useDispatch, useSelector } from "react-redux";

// const PostRegistration = (props) => {
//   const dispatch = useDispatch();
//   const [signUpResult, setSignUpResult] = useState(null);
//   // const [user, setUser] = useContext(UserContext);

//   useEffect(async () => {
//     if (Object.keys(userState.user).length === 0) {
//       await dispatch(getUserInfo());
//     }
//   }, []);

//   const userState = useSelector((store) => store.userreducer);

//   const userContinue = async () => {
//     await dispatch(
//       updateUser({
//         _id: userState.user?.user?._id,
//         user: {
//           active: true,
//         },
//       })
//     );

//     if (userState.isUserUpdated) {
//       setSignUpResult("CONTINUE");
//     }

//     // .then((response) => {
//     //   setSignUpResult("CONTINUE");
//     // })
//     // .catch((error) => {
//     //   console.log(error);
//     // });
//   };

//   const userWait = () => {
//     setSignUpResult("WAIT");
//   };

//   const renderComponent = (param) => {
//     switch (param) {
//       // Commenting for now but might need to use this once we implement email verification
//       // case 'CONTINUE':
//       //   return (
//       //     <Wrapper>
//       //       <AirplanePicture />
//       //       <ConfirmationTitle>
//       //         An email confirmation is on its way.
//       //     </ConfirmationTitle>
//       //       <ConfirmationText>
//       //         Thanks for joining OpenMentorshop. We’re excited for you to gain
//       //         success in your career.
//       //     </ConfirmationText>
//       //     </Wrapper>
//       //   )
//       case "CONTINUE":
//         return <Redirect to="/matches" />;

//       case "WAIT":
//         return (
//           <Wrapper>
//             <ThumbsUpPicture />
//             <WaitTitle>
//               No problem! We’ll hold your information until you’re ready.
//             </WaitTitle>
//             <WaitText>
//               Just sign back in and indicate that you’re ready for the
//               mentorship session.
//             </WaitText>
//           </Wrapper>
//         );

//       default:
//         return (
//           <Container>
//             <Wrapper>
//               <TitleWrapper>
//                 <Title>
//                   Thanks for signing up with Open Mentorship! Here is how you
//                   make a connection...
//                 </Title>
//               </TitleWrapper>
//               <BodyText>
//                 Please read through these steps, and indicate whether you want
//                 to continue with the process or wait until you’re ready for a
//                 matching session.
//               </BodyText>

//               <ContentWrapper>
//                 <PictureTextWrapper>
//                   <MailPicture />
//                   <PictureText>
//                     You will recieve an email confirmation of your application.
//                   </PictureText>
//                 </PictureTextWrapper>

//                 <PictureTextWrapper>
//                   <HumansPicture alt="" />
//                   <PictureText>
//                     Within one week, you will recieve a curated list of mentors
//                     to choose from.
//                   </PictureText>
//                 </PictureTextWrapper>

//                 <PictureTextWrapper>
//                   <PenPaperPicture alt="" />
//                   <PictureText>
//                     You will have one week from the day you recieve the list to
//                     message each of your top choices, explaining why you want to
//                     work with them.
//                   </PictureText>
//                 </PictureTextWrapper>

//                 <PictureTextWrapper>
//                   <MagnifyPicture alt="" />
//                   <PictureText>
//                     After that period, the mentors will recieve their requests,
//                     and will have one week to decide on who they want to work
//                     with.
//                   </PictureText>
//                 </PictureTextWrapper>

//                 <PictureTextWrapper>
//                   <HandShakePicture alt="" />
//                   <PictureText>
//                     When a match is made, you will have a set amount of time
//                     that your session will last. Make it count!
//                   </PictureText>
//                 </PictureTextWrapper>
//               </ContentWrapper>

//               <ButtonWrapper>
//                 <Button onClick={userContinue}>
//                   <ButtonText>I'm In!</ButtonText>
//                 </Button>
//                 <Button wait onClick={userWait}>
//                   <ButtonText wait>I'm going to wait.</ButtonText>
//                 </Button>
//               </ButtonWrapper>
//             </Wrapper>
//           </Container>
//         );
//     }
//   };

//   return <div>{renderComponent(signUpResult)}</div>;
// };

// export default PostRegistration;

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import {
  Wrapper,
  ThumbsUpPicture,
  WaitTitle,
  WaitText,
} from "./PostRegistrationStyling";
import PostRegister from "../components/PostRegister";

import { getUserInfo, updateUser } from "../../../redux/Actions/UserActions";

import { useDispatch, useSelector } from "react-redux";

const PostRegistration = (props) => {
  const dispatch = useDispatch();
  const [signUpResult, setSignUpResult] = useState(null);

  useEffect(async () => {
    if (Object.keys(userState.user).length === 0) {
      await dispatch(getUserInfo());
    }
  }, []);

  const userState = useSelector((store) => store.userreducer);

  const userContinue = async () => {
    await dispatch(
      updateUser({
        _id: userState.user?.user?._id,
        user: {
          active: true,
        },
      })
    );

    if (userState.isUserUpdated) {
      setSignUpResult("CONTINUE");
    }
  };

  const userWait = () => {
    setSignUpResult("WAIT");
  };

  const renderComponent = (param) => {
    switch (param) {
      // Commenting for now but might need to use this once we implement email verification
      // case 'CONTINUE':
      //   return (
      //     <Wrapper>
      //       <AirplanePicture />
      //       <ConfirmationTitle>
      //         An email confirmation is on its way.
      //     </ConfirmationTitle>
      //       <ConfirmationText>
      //         Thanks for joining OpenMentorshop. We’re excited for you to gain
      //         success in your career.
      //     </ConfirmationText>
      //     </Wrapper>
      //   )
      case "CONTINUE":
        return <Redirect to="/" />;

      case "WAIT":
        return (
          <Wrapper>
            <ThumbsUpPicture />
            <WaitTitle>
              No problem! We’ll hold your information until you’re ready.
            </WaitTitle>
            <WaitText>
              Just sign back in and indicate that you’re ready for the
              mentorship session.
            </WaitText>
          </Wrapper>
        );

      default:
        let mentorFindText = (
          <div>
            Mentees will find you and send a connection request based on your
            profile and their goal <br /> (Ps: you can mentor upto 3 people at a
            time)
          </div>
        );
        let mentorSearchText = (
          <div>
            You will have 1 week from the time of the request to review and
            respond.
            <br /> (Ps: dont leave them hanging)
          </div>
        );
        return (
          <>
            {props.userType === "mentee" ? (
              <PostRegister
                emailText="You will recieve an email confirmation of your registeration."
                findText="Explore and find mentors based on your interests and goals"
                requestText="Send a request to connect with mentors you like. Be specific about what you are looking for"
                searchText="Sit tight, the mentors will have one week to accept your request"
                connectText="Connect with your mentor. Make it count!"
                userContinue={userContinue}
              />
            ) : (
              <PostRegister
                emailText="You will recieve an email confirmation of your registration."
                findText={mentorFindText}
                searchText={mentorSearchText}
                connectText="Connect with your mentee. Time to be a sherpa!"
                userContinue={userContinue}
              />
            )}
          </>
        );
    }
  };

  return <div>{renderComponent(signUpResult)}</div>;
};

export default PostRegistration;
