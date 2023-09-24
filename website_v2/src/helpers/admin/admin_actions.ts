// Handle admin actions
const performAdminActions = (
  buttonText: string,
  setConfirmationText: (confirmationText: string) => void
) => {
  // Disable Account
  if (buttonText === "Disable Account") {
    setConfirmationText("Are you sure you want to disable this account?");
  }

  // Enable Account
  if (buttonText === "Enable Account") {
    setConfirmationText("Are you sure you want to enable this account?");
  }

  // Approve Account
  if (buttonText === "Approve Account") {
    setConfirmationText("Are you sure you want to approve this account?");
  }

  // Deny Account
  if (buttonText === "Deny Account") {
    setConfirmationText("Are you sure you want to deny this account?");
  }
};

export {performAdminActions};
