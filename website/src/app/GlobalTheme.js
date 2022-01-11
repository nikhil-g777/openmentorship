import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        h6: {
          marginBottom: "1.5rem",
        },
        body: {
          fontSize: "1em",
        },
        a: {
          color: "#000",
        },
        a: {
          "&hover": {
            color: "#000",
          },
        },
      },
    },
    MuiFormControl: {
      root: {
        margin: "1em 0",
        display: "flex",
        flexDirection: "column",
      },
    },
    MuiInputBase: {
      root: {
        width: "100%",
      },
    },
    MuiList: {
      root: {
        display: "flex",
        flexDirection: "column",
      },
    },
    MuiMobileStepper: {
      root: {
        width: "70%",
        flexGrow: 1,
        position: "inherit",
        display: "flex",
        flexDirection: "column-reverse",
      },
      positionBottom: {
        position: "inherit",
      },
      dots: {
        padding: "2em",
      },
      dot: {
        width: "15px",
        height: "15px",
        margin: "0 8px",
      },
    },
    MuiMenuItem: {
      root: {
        "&$selected": {
          fontWeight: "800",
          background: "#fff",
        },
      },
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          "background-color": "#69b595",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#69b595",
    },
    secondary: {
      main: "#6D6D6D",
    },
    background: {
      default: "#fff",
    },
  },
});

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "1em",
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "18.5px 14px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["proxima_nova"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
