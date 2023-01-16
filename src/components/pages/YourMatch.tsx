import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { Box, Grid, Typography } from '@mui/material';
import { API_SERVER } from '../../app/constants';
import '../../App.css';

function YourMatch(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);
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
    await axios
      .get(`${API_SERVER}/matching`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setMatch(result.data);
          console.log(result.data)
        } else {
          console.log(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
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
          marginBottom: '2rem',
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
          color: 'common.darkGrey',
          borderRadius: '1rem',
          padding: '2rem',
          fontSize: '0.8rem',
          textAlign: 'center',
          marginTop: '2rem',
          minWidth: 400,
          maxWidth: '90%',
          boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
          justifyContent: 'center',
        }}
      >
        <Typography variant='overline'>{match.username}</Typography>
        <Typography variant='overline'>{match.email}</Typography>
        <Typography variant='overline'>{match.bday}</Typography>
        <Typography variant='overline'>{match.city}</Typography>
        <Typography variant='overline'>{match.fb}</Typography>
        <Typography variant='overline'>{match.tt}</Typography>
        <Typography variant='overline'>{match.ig}</Typography>
      </Box>
    </Grid>
  );
}

export default YourMatch;
