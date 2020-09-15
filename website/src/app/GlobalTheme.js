import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@material-ui/core'


export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        border:'2px solid lightgreen !important',
        background:'white !important',
        borderRadius:'30px !important',
        color:'lightgreen !important',
        padding: '1em !important',
        width:'100% !important',
      },
    },
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        h6: {
          marginBottom:"1.5rem"
        },
        body:{
          fontSize:'1em'
        },
        a: {
          color:"#000"
        },
        a: {
          '&hover': {
            color:"#000"
          }
        }
      },
    },
    MuiFormControl: {
      root: {
        margin:'1em 0',
        display:'flex',
        flexDirection:'column'
      }
    },
    MuiInputBase:{
      root: {
        width: '100%'
      }
    },
    MuiList: {
      root: {
        display:'flex',
        flexDirection:'column',
        width: '210px'
      }
    },
    MuiMobileStepper: {
      root: {
        width:"90%",
        maxWidth: 500,
        flexGrow: 1,
        position: 'absolute',
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
    },
    MuiMenuItem: { 
      root: {
        "&$selected": { 
          fontWeight:'800',
          background:"#fff"
        },
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

export const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: "1em",
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '18.5px 14px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
