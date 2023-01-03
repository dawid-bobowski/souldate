import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainImage from '../../assets/jonathan-borba-couple2.jpg';

// desktop UI to be reworked
function Home(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='home-container'
      sx={{
        minHeight: '100vh',
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
          <Box
            component='img'
            src={MainImage}
            sx={{
              width: { sm: 1400 },
              height: '100vh',
              overflow: 'hidden',
            }}
          />
        </Grid>
        <Grid
          item
          sm={1}
        />
        <Box sx={{ position: 'absolute', top: { xs: 150, sm: 300 }, left: { xs: 25, sm: 200 } }}>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '3rem', sm: '6rem' },
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
              fontSize: { xs: '1.75rem', sm: '3.5rem' },
              maxWidth: '80%',
              fontFamily: '"Yeseva One", cursive',
              textShadow: '3px 3px rgba(18, 18, 18, 1)',
            }}
          >
            Na wyciągnięcie ręki
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '1rem',
            position: 'absolute',
            top: { sm: 550 },
            right: { sm: 200 },
            bottom: { xs: 100, sm: 'unset' },
            margin: { xs: '0 auto', sm: 'unset' },
          }}
        >
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
            dla Ciebie. Nasz algorytm znajdzie osobę najbardziej podobną do Ciebie na podstawie wspólnych zainteresowań
            i preferencji, dzięki czemu masz pewność, że trafisz na osobę, która naprawdę Cię rozumie. Nie czekaj,
            dołącz już dziś i znajdź swoją bratnią duszę!
          </Typography>
        </Grid>
        <Grid
          item
          width={1000}
          sx={{
            color: 'common.black',
            backgroundColor: 'common.white',
            position: 'relative',
            left: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '5rem',
          }}
        >
          <Typography variant='h2'>Nasz zespół</Typography>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: '1rem',
              padding: '3rem 0',
            }}
          >
            <Box sx={styles.teamBox}>
              <Avatar
                alt='członek zespołu 1'
                src=''
                sx={styles.teamAvatar}
              />
              <Typography
                variant='caption'
                sx={styles.teamTypography}
              >
                Dawid Bobowski
              </Typography>
            </Box>
            <Box sx={styles.teamBox}>
              <Avatar
                alt='członek zespołu 2'
                src=''
                sx={styles.teamAvatar}
              />
              <Typography
                variant='caption'
                sx={styles.teamTypography}
              >
                Igor Olszewski
              </Typography>
            </Box>
            <Box sx={styles.teamBox}>
              <Avatar
                alt='członek zespołu 3'
                src=''
                sx={styles.teamAvatar}
              />
              <Typography
                variant='caption'
                sx={styles.teamTypography}
              >
                Kinga Śmiałek
              </Typography>
            </Box>
            <Box sx={styles.teamBox}>
              <Avatar
                alt='członek zespołu 4'
                src=''
                sx={styles.teamAvatar}
              />
              <Typography
                variant='caption'
                sx={styles.teamTypography}
              >
                Edyta Górka
              </Typography>
            </Box>
            <Box sx={styles.teamBox}>
              <Avatar
                alt='członek zespołu 5'
                src=''
                sx={styles.teamAvatar}
              />
              <Typography
                variant='caption'
                sx={styles.teamTypography}
              >
                Karolina Wiśniewska
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;

const styles = {
  teamBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamAvatar: {
    width: 140,
    height: 140,
  },
  teamTypography: {
    marginTop: '1rem',
  },
};
