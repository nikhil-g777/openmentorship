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