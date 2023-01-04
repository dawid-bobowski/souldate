import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import MainImage from '../../assets/sparks.jpg';
import Heart from '../../assets/heart.png';
import Dev1 from '../../assets/authors/dev1.png';
import Dev2 from '../../assets/authors/dev2.png';
import Dev3 from '../../assets/authors/dev3.png';
import Dev4 from '../../assets/authors/dev4.png';
import Dev5 from '../../assets/authors/dev5.png';

function Home(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='home-container'
      sx={{
        color: 'common.white',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
        minHeight: '100vh',
        width: '100%',
        maxWidth: 1920,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        id='home-main-image'
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          width: '100%',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            background: `url(${MainImage})`,
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box
            id='main-page-slogan'
            sx={{
              position: 'absolute',
              top: { xs: 'unset', sm: 500, md: 400 },
              left: { xs: 30, sm: 100 },
              bottom: { xs: 250, sm: 'unset' },
            }}
          >
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
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
                fontSize: { xs: '1.75rem', md: '2.25rem', lg: '3.5rem' },
                fontFamily: '"Yeseva One", cursive',
                textShadow: '3px 3px rgba(18, 18, 18, 1)',
              }}
            >
              Na wyciągnięcie ręki
            </Typography>
          </Box>
          <Box
            id='main-page-buttons'
            sx={{
              display: 'flex',
              gap: '1rem',
              position: 'absolute',
              bottom: 50,
              right: { xs: 'unset', sm: 200 },
              left: { xs: 'calc((100% - 21rem) / 2)', lg: 'unset' },
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
                width: { xs: '10rem', sm: '12rem' },
                fontSize: '1.5rem',
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
                width: { xs: '10rem', sm: '12rem' },
                fontSize: '1.5rem',
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
        </Box>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          sx={{
            color: 'common.black',
            backgroundColor: 'common.white',
            width: '100%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '5rem',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant='h2'
              sx={{ fontFamily: '"Archivo Black", sans-serif', fontSize: { xs: '2.5rem', sm: '3rem' } }}
            >
              O projekcie
            </Typography>
            <Typography
              component='span'
              sx={{
                fontSize: { xs: '1rem', sm: '1.5rem' },
                textAlign: 'justify',
                padding: { xs: '2.5rem', md: '5rem 5rem 0 5rem' },
                maxWidth: 1000,
                margin: '0 auto',
              }}
            >
              Jeśli szukasz bratniej duszy, z którą chciał_byś dzielić swoje pasje, marzenia i emocje, to{' '}
              <b>SoulDate</b> jest dla Ciebie. Nasz algorytm znajdzie osobę najbardziej podobną do Ciebie na podstawie
              wspólnych zainteresowań i preferencji, dzięki czemu masz pewność, że trafisz na osobę, która naprawdę Cię
              rozumie. <b>Nie czekaj</b>, dołącz już dziś i znajdź swoją bratnią duszę!
            </Typography>
            <Box
              component='img'
              src={Heart}
              width={300}
              sx={{
                margin: { xs: '0 -2rem 5rem 0', md: '3rem 10rem 5rem 0' },
                alignSelf: 'flex-end',
              }}
            />
            <Box sx={{ maxWidth: 1000, width: '100%', borderBottom: '1px grey solid' }}></Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            color: 'common.black',
            backgroundColor: 'common.white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: { xs: '2.5rem', sm: '5rem 10rem' },
            boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
            borderRadius: '0 0 2rem 2rem',
          }}
        >
          <Typography
            variant='h2'
            sx={{ fontFamily: '"Archivo Black", sans-serif', fontSize: { xs: '2.5rem', sm: '3rem' } }}
          >
            Nasz zespół
          </Typography>
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
                src={Dev1}
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
                alt='członek zespołu 4'
                src={Dev4}
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
                alt='członek zespołu 2'
                src={Dev2}
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
                src={Dev3}
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
                alt='członek zespołu 5'
                src={Dev5}
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
        <Box sx={{ margin: '4rem 0', width: '100%', textAlign: 'center' }}>
          <Typography
            variant='h3'
            sx={{ fontSize: '1.5rem' }}
          >
            SoulDate &copy; 2023
          </Typography>
        </Box>
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
    fontSize: { xs: '1.25rem', sm: 'inherit' },
  },
};
