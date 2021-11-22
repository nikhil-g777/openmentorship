import React from "react";

// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
Container,
Typography
} from "@material-ui/core";
import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({

  tilte: {
    textAlign:'center',
    marginTop:'10%',
    fontSize:'28px'

  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
  },
});

export default function Mentee(props) {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container>
        <Typography variant="h6" className={classes.tilte}>Profile</Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}
