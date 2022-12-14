import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/souldate-logo.png';
import MainImage from '../../assets/jonathan-borba-couple2.jpg';

function Home(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='home-container'
      sx={{
        height: '100vh',
        color: 'common.white',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
      }}
    >
      <Grid
        id='home-container'
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          sm={1}
        />
        <Grid
          item
          sm={8}
        >
          <img
            src={MainImage}
            width={1400}
          />
        </Grid>
        <Grid
          item
          sm={1}
        />
        <Box sx={{ position: 'absolute', top: 450, left: 200 }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: '6.rem',
              fontFamily: '"Yeseva One", cursive',
              textShadow: '5px 5px rgba(18, 18, 18, 1)',
            }}
          >
            Twoja bratnia dusza
          </Typography>
          <Typography
            variant='h1'
            sx={{
              position: 'relative',
              left: 50,
              fontSize: '3.5rem',
              fontFamily: '"Yeseva One", cursive',
              textShadow: '3px 3px rgba(18, 18, 18, 1)',
            }}
          >
            Na wyciągnięcie ręki
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', position: 'absolute', top: 800, right: 400 }}>
          <Button
            to='/login'
            aria-label='login'
            variant='contained'
            component={Link}
            sx={{
              background: 'linear-gradient(#6d1416 0%, #B24C32 30%, #B24C32 70%, #6d1416 100%)',
              color: 'common.white',
              width: '12rem',
              fontSize: '1.5rem',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '2px 2px rgba(18, 18, 18, 1)',
              textTransform: 'capitalize',
              ':hover': {
                color: 'common.white',
                background: 'linear-gradient(#500d0e 0%, #8a2022 30%, #8a2022 70%, #500d0e 100%)',
              },
            }}
          >
            Logowanie
          </Button>
          <Button
            to='/register'
            aria-label='register'
            variant='contained'
            component={Link}
            sx={{
              background: 'linear-gradient(#6d1416 0%, #B24C32 30%, #B24C32 70%, #6d1416 100%)',
              color: 'common.white',
              width: '12rem',
              fontSize: '1.5rem',
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'capitalize',
              textShadow: '2px 2px rgba(18, 18, 18, 1)',
              ':hover': {
                background: 'linear-gradient(#500d0e 0%, #8a2022 30%, #8a2022 70%, #500d0e 100%)',
              },
            }}
          >
            Rejestracja
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '5rem 0',
        }}
      >
        <Grid
          item
          width={1000}
          sx={{
            color: 'common.black',
            backgroundColor: 'common.white',
            position: 'relative',
            left: 100,
          }}
        >
          <Typography
            variant='h5'
            sx={{ maxWidth: 1000 }}
          >
            Jeśli szukasz bratniej duszy, z którą będziesz mógł dzielić swoje pasje, marzenia i emocje, to SoulDate jest
            dla Ciebie. Nasz algorytm dobiera pary na podstawie wspólnych zainteresowań i preferencji, dzięki czemu masz
            pewność, że trafisz na osobę, która naprawdę Cię rozumie. Nie czekaj, dołącz już dziś i znajdź swoją bratnią
            duszę!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
