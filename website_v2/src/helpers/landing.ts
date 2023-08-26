import {LoginHandler} from "@/types/landing";

const list = [
  {
    id: "1",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "2",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "3",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "4",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "5",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
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
  // Registratiaon Incomplete
  if (error === "registrationStatus: incomplete") {
    setAuthenticationError({
      heading: "Registration Incomplete",
      subHeading: "Please complete your registration to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your registration is incomplete. Please complete all required fields in the registration form before attempting to sign in.",
    });
  }
  // Registration Pending Confirmation
  else if (error === "registrationStatus: pendingConfirmation") {
    setAuthenticationError({
      heading: "Registration Pending Confirmation",
      subHeading: "Please confirm your email to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your registration is pending confirmation. Please check your email for a confirmation link.",
    });
  }
  // Registration Pending Approval
  else if (error === "registrationStatus: pendingApproval") {
    setAuthenticationError({
      heading: "Registration Pending Approval",
      subHeading: "Please wait for approval to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your registration is pending approval. Please wait for approval before attempting to sign in.",
    });
  }
  // Registration Denied
  else if (error === "registrationStatus: denied") {
    setAuthenticationError({
      heading: "Registration Denied",
      subHeading: "Please contact support to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your registration has been denied. Please contact support for more information.",
    });
  }
  // Registration Disabled
  else if (error === "registrationStatus: disabled") {
    setAuthenticationError({
      heading: "Registration Disabled",
      subHeading: "Please contact support to continue.",
      message:
        "Sorry, you cannot sign in at the moment because your registration has been disabled. Please contact support for more information.",
    });
  }
  // Unable to login user
  else if (error === "Unable to login user") {
    setAuthenticationError({
      heading: "Unable to Login",
      subHeading: "Please try again later.",
      message:
        "Sorry, you cannot sign in at the moment because we are unable to login your account. Please try again later.",
    });
  }
};

export {list, handleLoginErrors};
