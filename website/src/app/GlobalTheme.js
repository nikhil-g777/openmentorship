import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
    MuiButton: {
      text: {
        border:'2px solid lightgreen',
        background:'white',
        borderRadius:'30px',
        color:'lightgreen',
        padding: '1em',
        width:'100%',
      },
    },
    MuiMobileStepper: {
      root: {
        width:"90%",
        maxWidth: 500,
        flexGrow: 1,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column-reverse'
      },
      dots: {
        padding: "2em"
      },
      dot: {
        width:"15px",
        height:"15px",
        margin: "0 8px"
      }
    }
  },
  palette: {
    primary: {
      main: "#69b595",
    },
    secondary: {
      main: "#1cbbd4",
    },
    background: {
      default: "#fff"
    } 
  },
});