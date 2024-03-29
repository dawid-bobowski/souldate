import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch } from '../../app/hooks';
import { setError, startLoading, stopLoading } from '../../features/app/appSlice';
import { login } from '../../features/user/userSlice';
import { API_SERVER } from '../../app/constants';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/sparks.jpg';
import Logo from '../../assets/souldate-logo.png';
import Ukw from '../../assets/ukw-logo.png';
import BluSoft from '../../assets/blusoft-logo.png';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleLogin(): Promise<void> {
    if (!username || !password) return;

    dispatch(startLoading());
    await axios
      .post(`${API_SERVER}/login`, {
        username,
        password,
      })
      .then((result) => {
        if (result.status === 200) {
          setUsername('');
          setPassword('');
          dispatch(login(result.data));
          dispatch(stopLoading());
          navigate('/dashboard');
          dispatch(
            setError({
              msg: `Zalogowano!`,
            })
          );
        } else {
          dispatch(stopLoading());
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
        dispatch(stopLoading());
        dispatch(
          setError({
            msg: `Unable to send request. Error message: ${error.message}`,
          })
        );
      });
  }

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (token !== null && username !== null) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Grid
      id='login-container'
      container
      component='main'
      sx={{
        height: '100vh',
      }}
    >
      <Grid
        id='login-slided-cover'
        item
        xs={false}
        sm={6}
        sx={{
          backgroundImage: `url(${LoginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 85% 0%)',
          transition: '0.5s ease-in-out',
          zIndex: 1,
          ':hover': {
            transition: '0.5s ease-in-out',
            transform: 'translate(-20px, 0)',
          },
        }}
      />
      <Grid
        item
        sm={1}
      />
      <Grid
        id='login-form-container'
        item
        xs={12}
        sm={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'space-around',
        }}
      >
        <Box
          component='img'
          src={Logo}
          width={200}
          onClick={() => navigate('/')}
          sx={{
            margin: '0 auto',
            ':hover': {
              cursor: 'pointer',
            },
          }}
        />
        <Box
          id='login-form'
          component='form'
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            margin='normal'
            id='username'
            label='Login'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin='normal'
            name='password'
            label='Hasło'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type='button'
            variant='contained'
            disabled={!username || !password}
            color='primary'
            onClick={handleLogin}
            sx={{ m: 2, color: 'common.white', boxShadow: 'none', textTransform: 'none', borderRadius: 1 }}
          >
            Zaloguj się
          </Button>
        </Box>
        <Box
          id='back-to-register-button'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography>
            Nie masz konta? <Link to='/register'>Dołącz do nas</Link>!
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: '90%', sm: 'auto' },
            margin: '0 auto',
            padding: '3rem 0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <img
              src={Ukw}
              width={100}
            />
            <img
              src={BluSoft}
              width={90}
            />
          </Box>
          <Typography
            fontSize={12}
            sx={{ marginTop: 2, textAlign: 'center', maxWidth: 500 }}
          >
            Projekt stworzony na potrzeby przedmiotu Zespołowy projekt informatyczny na Uniwersytecie Kazimierza
            Wielkiego ze wsparciem firmy BluSoft Sp. z o.o. Wszelkie prawa zastrzeżone.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
