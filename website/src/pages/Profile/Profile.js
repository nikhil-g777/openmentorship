import React from 'react';
import { Box, Grid } from '@material-ui/core';
// mui
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import SocialIcon1 from '../../images/image 24.png';
import SocialIcon2 from '../../images/image 23.png';
import linked from '../../images/image 16.png';
import editIcon from '../../images/edit 1.png';

const useStyles = makeStyles((theme) => ({
  profile_container: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.1)',
    marginTop: '80px',
    padding: '30px'
  },
  profile_img: {
    borderRadius: '5px',
    width: '191px',
    height: '191px',
    [theme.breakpoints.down('sm')]: {
      width: '117px',
      height: '120px'
    }
  },
  pro_typo1: {
    // fontFamily: 'Proxima Nova',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '27px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  pro_typo2: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    linHeight: '27px',
    color: '#6D6D6D',
    marginTop: '10px'
  },
  pro_typo3: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '27px',
    marginTop: '25px'
  },
  pro_typo4: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '27px',
    marginTop: '10px'
  },
  pro_typo_btn: {
    backgroundColor: '#F1F1F1',
    borderRadius: '4px',
    // width: '140px',
    // height: '30px',
    textAlign: 'center',
    padding: '8px',
    fontSize: '13px'
    // [theme.breakpoints.down('sm')]: {
    //   width: '130px'
    // }
  },
  social_div: {
    marginTop: '15px'
  },
  pro_typo_div: {
    display: 'flex',
    alignItems: 'center'
  },
  pro_typo_div_main: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  edit_txt: {
    color: '#51B6A5 ',
    textDecoration: 'underline',
    fontSize: '16px',
    marginLeft: '10%'
  },
  pro_typo_div2: {
    display: 'flex',
    alignItems: 'center'
  },
  pro_typo1_sm: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '27px',
      display: 'block',
      marginLeft: '4%'
    }
  },
  img_div_xs: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  }
  /* or 135% */
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  }
});

export default function Mentee(props) {
  const classes = useStyles();
  const data = [1, 1, 1, 1, 1, 1];
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid
            container
            xs={12}
            md={10}
            lg={10}
            justify="space-around"
            className={classes.profile_container}
          >
            <Grid item xs={12} md={2} lg={2} style={{ marginTop: '10px' }}>
              <Box component="div" className={classes.img_div_xs}>
                <img
                  className={classes.profile_img}
                  src="https://wallpaperaccess.com/full/2969091.jpg"
                />
                <Typography className={classes.pro_typo1_sm}>
                  Emily Lee
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={7} md={7} style={{ marginTop: '10px' }}>
              <Box component="div" className={classes.pro_typo_div_main}>
                <Box component="div" className={classes.pro_typo_div}>
                  <Typography className={classes.pro_typo1}>
                    Emily Lee
                  </Typography>
                  <img src={linked} style={{ marginLeft: '3%' }} />
                </Box>
                <Box component="div" className={classes.pro_typo_div2}>
                  <img src={editIcon} width="23px" height="23px" />
                  <Typography className={classes.edit_txt}>Edit</Typography>
                </Box>
              </Box>
              <Typography className={classes.pro_typo2}>
                Marketing Intern at Propeller Health<br></br>Cognitive Science
                at UCLA 2022
              </Typography>
              <Typography className={classes.pro_typo3}>About</Typography>
              <Typography className={classes.pro_typo4}>
                I am a second-year UCLA Regents Scholar interested in digital
                health, healthcare management, population health studies, and
                social innovation. I am experienced in email marketing
                techniques, SEO and brand analytics.
              </Typography>
              <Typography className={classes.pro_typo3}>
                Areas of interest
              </Typography>
              <Typography className={classes.pro_typo4}>
                Public health, social innovation, digital health, healthcare
                management
              </Typography>
              <Typography className={classes.pro_typo3}>Top skills</Typography>
              <Typography className={classes.pro_typo4}>
                Marketing techniques, SEO, brand analytics, email marketing
              </Typography>
              <Typography className={classes.pro_typo3}>Looking for</Typography>
              <Grid item container spacing={1} style={{ marginTop: '10px' }}>
                {data.map((txt) => (
                  <Grid item>
                    <Typography className={classes.pro_typo_btn}>
                      Mock interview
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Typography className={classes.pro_typo3}>
                Social Media
              </Typography>
              <Box component="div" className={classes.social_div}>
                <img src={SocialIcon2} />

                <img src={SocialIcon1} style={{ marginLeft: '3%' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}
