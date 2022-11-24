import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/souldate-logo.png';

function Home(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='home-container'
      sx={styles.grid}
    >
      <img
          src={Logo}
          width={450}
        />
      <span>SoulDate to aplikacja internetowa stworzona dla osób poszukujących bratnich dusz. Powiedz nam coś o sobie, a nasz system znajdzie dla Ciebie idealne dopasowanie!</span>
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
