import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Error from "../../images/error.png";
import { useHistory } from "react-router-dom";
import "../../style/Error.css";
const ErrorFound = () => {
  const history = useHistory();

  const handleHome = () => {
    history.push("/");
  };
  return (
    <Box className="erroe-box">
      <img src={Error} className="image-error" />
      <Typography variant="h4">Permission Denied</Typography>
      <Typography variant="h6" className="description-error">
        Sorry, You don't have the access to this page
      </Typography>
      <Button className="button-error" onClick={handleHome}>
        Go to the main page
      </Button>
    </Box>
  );
};

export default ErrorFound;
