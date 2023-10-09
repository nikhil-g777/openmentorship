import {LoginHandler} from "@/types/landing";
import {HandleUserRegistration} from "@/types/regsiter";
import {errorCodes} from "@/constants/errorCodes";
import {mainConstants} from "@/constants/main";

const list = [
  {
    id: "1",
    heading: "How do I become a mentor?",
    description:
      "To become a mentor, you must first sign up, creating a profile on the site. In your profile, you should include your professional experience, skills, and interests. You should also specify the areas in which you are interested in mentoring. Once you successfully signup, your profile is typically reviewed within 3-5 business days by our moderators to maintain mentor quality.",
  },
  {
    id: "2",
    heading: "How do I become a mentee?",
    description:
      "To become a mentee, you must first sign up, creating a profile on the site. In your profile, you should include your professional experience, skills, and interests. You should also specify the areas of interest for mentorship. Once you successfully signup, you can connect with mentors through our explore page.",
  },
  {
    id: "3",
    heading: "How do I find a mentor?",
    description:
      "To find a mentor, you can search the site by keyword, interests, or industry. You can also browse the profiles of mentors who are currently looking to mentor. Once you have found a mentor who you are interested in, you can send them a connection request.",
  },
  {
    id: "4",
    heading: "How are mentors and mentees matched?",
    description:
      "The mentors approve connection requests from mentees based on their skills, experience, and availability. The goal is to match mentors and mentees who have the most in common and who are likely to benefit from each other's knowledge and experience.",
  },
  {
    id: "5",
    heading: "How do I start a mentorship session?",
    description:
      "Once the mentor approves your connection request, you can start communicating with them through the site's messaging system. You can also schedule video calls or phone calls to discuss your goals and expectations. It is important to be clear about what you hope to achieve from the mentorship session.",
  },
  {
    id: "6",
    heading: "How long does a mentorship session last?",
    description:
      "The length of a mentorship session is up to the mentor and mentee. Some relationships may last for a few weeks, while others may last for months. It is recommended to establish scope and cadence for the sessions mutually at the start of each session.",
  },
  {
    id: "7",
    heading: "What are the benefits of mentorship?",
    description:
      "Mentorship can provide a number of benefits for both mentors and mentees. For mentors, it can be a rewarding experience to share their knowledge and experience with others. It can also help them to stay up-to-date on the latest trends in their field. For mentees, mentorship can provide guidance, support, and networking opportunities. It can also help them to develop their skills and knowledge, and to achieve their career goals.",
  },
  {
    id: "8",
    heading: "What are the responsibilities of mentors and mentees?",
    description:
      "Both mentors and mentees have responsibilities in a mentorship relationship. Mentors are responsible for providing guidance, support, and feedback. They should also be available to answer questions and to help mentees achieve their goals. Mentees are responsible for being open to feedback, for taking initiative, and for being willing to put in the work.",
  },
  {
    id: "9",
    heading: "What are the ground rules for mentorship relationships?",
    description:
      "It is important to establish ground rules for mentorship relationships. These rules should be agreed upon by both the mentor and mentee. Some common ground rules include:",
    list: [
      "Respecting each other's time",
      "Setting clear goals for each meeting",
      "Communicating openly and honestly",
      "Being willing to compromise",
    ],
  },
  {
    id: "10",
    heading: "What if I am not happy with my mentor?",
    description:
      "If you are not happy with your mentor, you should first try to talk to them about your concerns. If you are unable to resolve the issue, you can contact the moderators of the site.",
  },
  {
    id: "11",
    heading: "How do I end a mentorship session?",
    description:
      "If you decide to end a mentorship relationship, you should first talk to your mentor. Explain your reasons for ending the relationship and be respectful of their feelings.",
  },
];

// Handle Login
const handleLoginErrors = async ({
  error,
  setSuccessAlert,
  setAuthenticationError,
  setRouteActionLoading,
}: LoginHandler) => {
  setSuccessAlert("", 0);
  setRouteActionLoading(false);
  // Registration Pending Confirmation

  if (
    error ===
    `${errorCodes.loginInvalid.code}-${mainConstants.registrationStatus.pendingConfirmation.name}`
  ) {
    setAuthenticationError({
      heading: "Account Pending Confirmation",
      subHeading: "Please confirm your email to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your account is pending confirmation. Please check your email for a confirmation link.",
    });
  }
  // Registration Pending Approval
  else if (
    error ===
    `${errorCodes.loginInvalid.code}-${mainConstants.registrationStatus.pendingApproval.name}`
  ) {
    setAuthenticationError({
      heading: "Account Pending Approval",
      subHeading: "Please wait for approval to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your account is pending approval. Please wait for approval before attempting to sign in.",
    });
  }
  // Registration Denied
  else if (
    error ===
    `${errorCodes.loginInvalid.code}-${mainConstants.registrationStatus.denied.name}`
  ) {
    setAuthenticationError({
      heading: "Application Denied",
      subHeading: "Please contact support for more information.",
      message:
        "Sorry, you cannot sign in at the moment because your application has been denied. Please contact support for more information.",
    });
  }
  // Account Disabled
  else if (
    error ===
    `${errorCodes.loginInvalid.code}-${mainConstants.registrationStatus.disabled.name}`
  ) {
    setAuthenticationError({
      heading: "Account Disabled",
      subHeading: "Please contact support more information.",
      message:
        "Sorry, you cannot sign in at the moment because your account has been disabled. Please contact support for more information.",
    });
  }
  // Unable to login user
  else if (error === errorCodes.loginServerError.code) {
    setAuthenticationError({
      heading: "Unable to Login",
      subHeading: "Please try again later.",
      message:
        "Sorry, you cannot sign in at the moment because we are unable to login your account. Please try again later.",
    });
  }
  // Unable to register user
  else if (error === errorCodes.registerServerError.code) {
    setAuthenticationError({
      heading: "Unable to Register",
      subHeading: "Please try again later.",
      message:
        "Sorry, you cannot sign in at the moment because we are unable to register your account. Please try again later.",
    });
  }
  // Response JSON error
  else if (error === "res.json is not a function") {
    setAuthenticationError({
      heading: "Unable to Login",
      subHeading: "Please try again later.",
      message:
        "Sorry, you cannot sign in at the moment because we are unable to login your account. Please try again later.",
    });
  }
};

// Handle User Registration
const handleUserRegistration = ({
  user,
  setSuccessAlert,
  setToken,
  setUserId,
  setFirstName,
  setLastName,
  setEmail,
  router,
}: HandleUserRegistration) => {
  setToken(user.token);
  setUserId(user.user._id);
  setFirstName(user.user.firstName);
  setLastName(user.user.lastName);
  setEmail(user.user.email);
  router.push("/register");
  setSuccessAlert(
    "Tell us more about yourself so we can fully setup your account!",
    6
  );
};

export {list, handleLoginErrors, handleUserRegistration};
