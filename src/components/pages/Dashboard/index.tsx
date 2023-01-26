import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { setError, startLoading, stopLoading } from '../../../features/app/appSlice';
import { logout } from '../../../features/user/userSlice';
import { API_SERVER } from '../../../app/constants';
import { refreshPage } from '../../../helpers/utils';

import { Avatar, Box, Grid, Typography, Button, TextField } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ProfilePicture from './ProfilePicture';

function Dashboard(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfo>({
    username: '',
    email: '',
    bday: '',
    city: '',
    fb: '',
    ig: '',
    tt: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function handleUploadUser(): Promise<void> {
    dispatch(startLoading());
    await axios
      .patch(
        `${API_SERVER}/user`,
        {
          email: user.email,
          iglink: user.ig,
          fblink: user.fb,
          ttlink: user.tt,
          city: user.city,
          bday: user.bday,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((result) => {
        switch (result.status) {
          case 201:
            setIsEditing(false);
            dispatch(stopLoading());
            dispatch(setError({ msg: result.data.msg }));
            break;
          case 403:
            dispatch(logout());
            dispatch(stopLoading());
            navigate('/login', { replace: true });
            dispatch(setError({ msg: result.data.msg }));
          case 409:
            dispatch(stopLoading());
            refreshPage();
            dispatch(setError({ msg: result.data.msg }));
            break;
          default:
            dispatch(logout());
            dispatch(stopLoading());
            navigate('/login', { replace: true });
            dispatch(
              setError({
                msg: `Unable to get questions. HTTP status code: ${result.status}\nError message: ${
                  result.data.msg ?? ''
                }`,
              })
            );
        }
      })
      .catch((error) => {
        dispatch(logout());
        dispatch(stopLoading());
        navigate('/login', { replace: true });
        dispatch(
          setError({
            msg: `Unable to send request. Error message: ${error.message}`,
          })
        );
      });
  }

  async function getUser(): Promise<void> {
    dispatch(startLoading());
    await axios
      .get(`${API_SERVER}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        switch (result.status) {
          case 200:
            setUser(result.data);
            dispatch(stopLoading());
            break;
          case 403:
            dispatch(logout());
            dispatch(stopLoading());
            navigate('/login', { replace: true });
            dispatch(setError({ msg: result.data.msg }));
          default:
            dispatch(logout());
            dispatch(stopLoading());
            navigate('/login', { replace: true });
            dispatch(
              setError({
                msg: `Unable to get questions. HTTP status code: ${result.status}\nError message: ${
                  result.data.msg ?? ''
                }`,
              })
            );
        }
      })
      .catch((error) => {
        dispatch(logout());
        dispatch(stopLoading());
        navigate('/login', { replace: true });
        dispatch(
          setError({
            msg: `Unable to send request. Error message: ${error.message}`,
          })
        );
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
        paddingTop: { xs: '5rem', sm: '2rem' },
        paddingBottom: { xs: '5rem', sm: '2rem' },
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
            Email: <span style={{ fontWeight: 400 }}>{user.email}</span>
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
    boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
    width: { xs: '80%', lg: '900px' },
    mt: '2rem',
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
