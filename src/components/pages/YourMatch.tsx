import { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { Box, Grid } from '@mui/material';
import { PageTitle } from '../common';
import { API_SERVER } from '../../app/constants';
import '../../App.css';

function YourMatch(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  async function getMatch(): Promise<void> {
    await axios
      .get(`${API_SERVER}/matching`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
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
      sx={styles.grid}
    >
      <Box
          id='soulmate-frame'
          sx={{
            ...styles.soulMate,
            justifyContent: 'center',
          }}
      >
        <PageTitle title='TWOJA BRATNIA DUSZA' />
        <h2>Cześć {username}, Twoje bratnie dusze wskazane przez nasz algorytm to: </h2>
        <h2>NAWIĄŻ KONTAKT Z TWOJĄ BRATNIĄ DUSZĄ</h2>
        <h2>1. Username + Sociale</h2>
        <h2>2. Username + Sociale</h2>
        <h2>3. Username + Sociale</h2>
        </Box>
    </Grid>
  );
}

export default YourMatch;

const styles = {
  grid: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224,159,62)',
    background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
  },
  soulMate: {
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
    boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
  },
};
