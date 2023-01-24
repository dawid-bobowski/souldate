import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { startLoading, stopLoading } from '../../features/app/appSlice';
import { useAppDispatch } from '../../app/hooks';

import { Avatar, Box, Grid, Tooltip, Typography, Zoom } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { API_SERVER } from '../../app/constants';
import '../../App.css';

function YourMatch(): JSX.Element {
  const dispatch = useAppDispatch();
  const [match, setMatch] = useState<Match>({
    username: '',
    email: '',
    bday: '',
    city: '',
    fb: '',
    ig: '',
    tt: '',
  });

  async function getMatch(): Promise<void> {
    dispatch(startLoading());
    await axios
      .get(`${API_SERVER}/matching`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          const { username, email, bday, city, fb, ig, tt } = result.data;
          setMatch({
            username: _.isNull(username) ? '' : username,
            email: _.isNull(email) ? '' : email,
            bday: _.isNull(bday) ? '' : bday,
            city: _.isNull(city) ? '' : city,
            fb: _.isNull(fb) ? '' : fb,
            ig: _.isNull(ig) ? '' : ig,
            tt: _.isNull(tt) ? '' : tt,
          });
          dispatch(stopLoading());
        } else {
          dispatch(stopLoading());
          console.log(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  useEffect(() => {
    getMatch();
  }, []);

  return (
    <Grid
      container
      component='main'
      id='dashboard-container'
      sx={{
        width: { xs: '100vw', sm: '100%' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
        paddingTop: { xs: '5rem', sm: '0' },
        paddingBottom: { xs: '5rem', sm: '0' },
      }}
    >
      <Typography
        variant='h2'
        sx={{
          color: 'common.white',
          fontFamily: '"Alexandria", sans-serif',
          fontSize: { xs: '2rem', sm: '3.5rem' },
          marginTop: { xs: '2rem' },
        }}
      >
        Twoje dopasowanie
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { sm: '1rem' },
          backgroundColor: 'common.white',
          color: 'common.black',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '2rem',
          boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
          width: { xs: '80%', lg: '900px' },
        }}
      >
        <Avatar
          alt={`${match.username}'s profile picture`}
          src={`${API_SERVER}/users/${match.username}.jpg`}
          sx={{ width: 100, height: 100, m: '0 auto', mb: 2 }}
        />
        <Typography
          variant='inherit'
          sx={styles.text}
        >
          Nazwa: <span style={{ fontWeight: 400 }}>{match.username}</span>
        </Typography>
        <Typography
          variant='inherit'
          sx={styles.text}
        >
          Email: <span style={{ fontWeight: 400 }}>{match.email}</span>
        </Typography>
        <Typography
          variant='inherit'
          sx={styles.text}
        >
          Data urodzenia: <span style={{ fontWeight: 400 }}>{_.isEmpty(match.bday) ? '-' : match.bday}</span>
        </Typography>
        <Typography
          variant='inherit'
          sx={styles.text}
        >
          Miasto: <span style={{ fontWeight: 400 }}>{_.isEmpty(match.city) ? '-' : match.city}</span>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', mt: 2 }}>
          {match.ig !== '' && (
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Tooltip
                title='Instagram'
                placement='top'
                TransitionComponent={Zoom}
              >
                <Avatar
                  sx={styles.socialIcon}
                  onClick={() => window.open(match.ig, '_blank')}
                >
                  <InstagramIcon fontSize='large' />
                </Avatar>
              </Tooltip>
            </Box>
          )}
          {match.fb !== '' && (
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Tooltip
                title='Facebook'
                placement='top'
                TransitionComponent={Zoom}
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <Avatar
                  sx={{
                    ...styles.socialIcon,
                    backgroundColor: 'common.secondary',
                  }}
                  onClick={() => window.open(match.fb, '_blank')}
                >
                  <FacebookIcon fontSize='large' />
                </Avatar>
              </Tooltip>
            </Box>
          )}
          {match.tt !== '' && (
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Tooltip
                title='Twitter'
                placement='top'
                TransitionComponent={Zoom}
              >
                <Avatar
                  sx={styles.socialIcon}
                  onClick={() => window.open(match.tt, '_blank')}
                >
                  <TwitterIcon fontSize='large' />
                </Avatar>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default YourMatch;

const styles = {
  socialWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  socialIcon: {
    backgroundColor: 'common.primary',
    width: { xs: 50, md: 75 },
    height: { xs: 50, md: 75 },
    ':hover': {
      cursor: 'pointer',
    },
  },
  text: {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 300,
    fontSize: '1.25rem',
  },
};
