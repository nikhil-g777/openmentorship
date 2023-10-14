// Keep this in sync with backend/lib/errorCodes.js
export const errorCodes = {
  missingInputs: {
    code: "missingInputs", // Request is missing required fields, status code would be 400.
  },
  loginInvalid: {
    code: "loginInvalid", // Invalid login because of registrationStatus.
  },
  loginServerError: {
    code: "loginServerError", // Interval server error while logging in.
  },
  registerServerError: {
    code: "registerServerError", // Interval server error while registering.
  },
};
