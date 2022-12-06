import { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { Grid } from '@mui/material';
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
      <PageTitle title='Twoja bratnia dusza' />
      <h2>Cześć {username}, Twoja bratnia dusza wskazana przez nasz algorytm to: </h2>
      <h2>Skontaktujcie się ze sobą: MAIL/TEL/FB/INS</h2>
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
  },
};
