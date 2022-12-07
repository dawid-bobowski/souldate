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
      <span>Jeśli szukasz bratniej duszy, z którą będziesz mógł dzielić swoje pasje, marzenia i emocje, to SoulDate jest dla Ciebie. Nasz algorytm dobiera pary na podstawie wspólnych zainteresowań i preferencji, dzięki czemu masz pewność, że trafisz na osobę, która naprawdę Cię rozumie. Nie czekaj, dołącz już dziś i znajdź swoją bratnią duszę!</span>
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
    color: 'common.white',
    backgroundColor: 'rgb(224,159,62)',
    background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
  },
};
