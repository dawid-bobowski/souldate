import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { PageTitle } from '../common';

function Home(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='home-container'
      sx={styles.grid}
    >
      <PageTitle title='Strona główna' />
      <span>Witaj na stronie głównej!</span>
      <Button
        to='/login'
        aria-label='login'
        variant='contained'
        component={Link}
      >
        Logowanie
      </Button>
      <Button
        to='/register'
        aria-label='register'
        variant='contained'
        component={Link}
      >
        Rejestracja
      </Button>
    </Grid>
  );
}

export default Home;

const styles = {
  grid: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'common.lightGrey',
  },
};
