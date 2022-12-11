import { useAppSelector } from '../../../app/hooks';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import ProfilePicture from './ProfilePicture';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Dashboard(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  return (
    <Grid
      container
      component='main'
      id='dashboard-container'
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
      }}
    >
      <Typography
        id='dashboard-mainText'
        variant='h1'
        sx={{
          color: 'common.white',
          fontFamily: '"Alexandria", sans-serif',
          fontSize: { xs: '2rem', sm: '3.5rem' },
          padding: '3rem 0',
        }}
      >
        Witaj na swoim profilu!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: { sm: '2rem' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          id='dashboard-profilePictureEdit'
          sx={{
            ...styles.profilePanel,
            marginTop: 0,
          }}
        >
          <ProfilePicture />
        </Box>
        <Box
          id='dashboard-credentialsEdit'
          sx={{
            ...styles.profilePanel,
            justifyContent: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Avatar sx={styles.socialIcon}>
              <InstagramIcon fontSize='large' />
            </Avatar>
            <Avatar
              sx={{
                ...styles.socialIcon,
                backgroundColor: 'common.secondary',
              }}
            >
              <FacebookIcon fontSize='large' />
            </Avatar>
            <Avatar sx={styles.socialIcon}>
              <TwitterIcon fontSize='large' />
            </Avatar>
          </Box>
        </Box>
      </Box>
      <Box
        id='dashboard-profileInfoEdit'
        sx={{
          ...styles.profilePanel,
          minWidth: { xs: 255, sm: 500 },
        }}
      >
        <Typography
          variant='h5'
          sx={styles.text}
        >
          Login: <span style={{ fontWeight: 400 }}>{username}</span>
        </Typography>
        <Typography
          variant='h5'
          sx={styles.text}
        >
          Email: <span style={{ fontWeight: 400 }}>{username}</span>
        </Typography>
        <Typography
          variant='h5'
          sx={styles.text}
        >
          Miejscowość: <span style={{ fontWeight: 400 }}>-</span>
        </Typography>
        <Typography
          variant='h5'
          sx={styles.text}
        >
          Data urodzenia: <span style={{ fontWeight: 400 }}>-</span>
        </Typography>
      </Box>
    </Grid>
  );
}

export default Dashboard;

const styles = {
  profilePanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { sm: '1rem' },
    backgroundColor: 'common.white',
    color: 'common.darkGrey',
    borderRadius: '1rem',
    padding: '2rem',
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '2rem',
    boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
  },
  socialIcon: {
    backgroundColor: 'common.primary',
    width: 75,
    height: 75,
  },
  text: {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 300,
  },
};
