import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAppSelector } from '../../../app/hooks';

import { Avatar, Box, Grid, Typography, Button, TextField } from '@mui/material';
import ProfilePicture from './ProfilePicture';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { API_SERVER } from '../../../app/constants';

/**
 * handleUploadUser should send PATCH request on /user endpoint
 * getUser should receive username and email too
 */

function Dashboard(): JSX.Element {
  const [user, setUser] = useState<UserInfo>({
    username: useAppSelector((state) => state.user.username),
    email: '',
    bday: '',
    city: '',
    fb: '',
    ig: '',
    tt: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleUploadUser(): Promise<void> {
    await axios
      .patch(`${API_SERVER}/registerCopy`, {
        username: user.username,
        email: user.email,
        iglink: user.ig,
        fblink: user.fb,
        ttlink: user.tt,
        city: user.city,
        bday: user.bday,
      })
      .then((result) => {
        if (result.status === 201) {
          setIsEditing(false);
          console.log('Profil zaktualizowany!');
        } else {
          console.log(
            'Unable to register. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to register. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  async function getUser(): Promise<void> {
    await axios
      .get(`${API_SERVER}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setUser(result.data);
        } else {
          console.log(
            'Unable to get data. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to get data. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  useEffect(() => {
    getUser();
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
      <Box sx={styles.profilePanel}>
        <Box
          id='dashboard-profilePictureEdit'
          sx={{
            ...styles.sectionWrapper,
            flexDirection: 'column',
          }}
        >
          <Typography
            variant='h2'
            sx={styles.sectionTitle}
          >
            Zdjęcie profilowe
          </Typography>
          <ProfilePicture />
        </Box>
        <Box
          className='section-separator'
          sx={styles.sectionSeparator}
        />
        <Typography
          variant='h2'
          sx={styles.sectionTitle}
        >
          Profile społecznościowe
        </Typography>
        <Box
          id='dashboard-socialEdit'
          sx={styles.sectionWrapper}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '1rem' }}>
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Avatar sx={styles.socialIcon}>
                <InstagramIcon fontSize='large' />
              </Avatar>
              <TextField
                margin='normal'
                name='instagram'
                label='Instagram Link'
                id='instalink'
                autoComplete='iglink'
                value={user.ig}
                onChange={(event) => setUser({ ...user, ig: event.target.value })}
                sx={styles.socialInput}
              />
            </Box>
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Avatar
                sx={{
                  ...styles.socialIcon,
                  backgroundColor: 'common.secondary',
                }}
              >
                <FacebookIcon fontSize='large' />
              </Avatar>
              <TextField
                margin='normal'
                name='facebook'
                label='Facebook Link'
                id='fblink'
                autoComplete='fblink'
                value={user.fb}
                onChange={(event) => setUser({ ...user, fb: event.target.value })}
                sx={styles.socialInput}
              />
            </Box>
            <Box
              className='social-box'
              sx={styles.socialWrapper}
            >
              <Avatar sx={styles.socialIcon}>
                <TwitterIcon fontSize='large' />
              </Avatar>
              <TextField
                margin='normal'
                name='twitter'
                label='Twitter Link'
                id='ttlink'
                autoComplete='ttlink'
                value={user.tt}
                onChange={(event) => setUser({ ...user, tt: event.target.value })}
                sx={styles.socialInput}
              />
            </Box>
          </Box>
        </Box>
        <Box
          className='section-separator'
          sx={styles.sectionSeparator}
        />
        <Typography
          variant='h2'
          sx={styles.sectionTitle}
        >
          Dane konta
        </Typography>
        <Box id='dashboard-userInfoEdit'>
          <Typography
            variant='inherit'
            sx={styles.text}
          >
            Login: <span style={{ fontWeight: 400 }}>{user.username}</span>
          </Typography>
          <Typography
            variant='inherit'
            sx={styles.text}
          >
            Email: <span style={{ fontWeight: 400 }}>{user.username}</span>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {isEditing ? (
              <TextField
                margin='normal'
                name='city'
                label='Miasto'
                id='city'
                autoComplete='city'
                value={user.city}
                onChange={(event) => setUser({ ...user, city: event.target.value })}
              />
            ) : (
              <Typography
                variant='inherit'
                sx={styles.text}
              >
                Miasto: <span style={{ fontWeight: 400 }}>{_.isEmpty(user.city) ? '-' : user.city}</span>
              </Typography>
            )}
            {isEditing ? (
              <TextField
                margin='normal'
                name='bday'
                label='Data urodzenia(r-m-d)'
                id='bday'
                autoComplete='bday'
                value={user.bday}
                onChange={(event) => setUser({ ...user, bday: event.target.value })}
              />
            ) : (
              <Typography
                variant='inherit'
                sx={styles.text}
              >
                Data urodzenia: <span style={{ fontWeight: 400 }}>{_.isEmpty(user.bday) ? '-' : user.bday}</span>
              </Typography>
            )}
          </Box>
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={isEditing ? handleUploadUser : () => setIsEditing(true)}
            sx={{ mt: 3, mb: 2, color: 'common.white', textTransform: 'none' }}
          >
            {isEditing ? 'Zaktualizuj zmiany' : 'Edytuj'}
          </Button>
        </Box>
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
    color: 'common.black',
    borderRadius: '1rem',
    padding: '2rem',
    textAlign: 'center',
    marginTop: '2rem',
    boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
    width: { xs: '80%', lg: '900px' },
  },
  sectionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sectionTitle: {
    color: 'common.black',
    fontFamily: '"Alexandria", sans-serif',
    fontSize: { xs: '1.5rem' },
    margin: '1rem 0',
  },
  socialWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  socialIcon: {
    backgroundColor: 'common.primary',
    width: { xs: 50, md: 75 },
    height: { xs: 50, md: 75 },
  },
  socialInput: {
    margin: 0,
  },
  text: {
    fontFamily: 'Alexandria, sans-serif',
    fontWeight: 300,
    fontSize: '1.25rem',
  },
  sectionSeparator: {
    maxWidth: 1000,
    width: '100%',
    borderBottom: '1px #e0e0e0 solid',
    marginTop: '1rem',
  },
};
