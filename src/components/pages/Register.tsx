import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch } from '../../app/hooks';
import { startLoading, stopLoading } from '../../features/app/appSlice';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import LoginImage from '../../assets/sparks.jpg';
import Logo from '../../assets/souldate-logo.png';
import { API_SERVER } from '../../app/constants';
import './Register.css';

function Register(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  async function handleRegister(): Promise<void> {
    dispatch(startLoading());
    await axios
      .post(`${API_SERVER}/register`, {
        username,
        password,
        email,
      })
      .then((result) => {
        if (result.status === 201) {
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          dispatch(stopLoading());
          navigate('/login');
        } else {
          dispatch(stopLoading());
          console.log(
            'Unable to register. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to register. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
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
        id='registration-slided-cover'
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
        id='registration-form-container'
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
            ':hover': {
              cursor: 'pointer',
            },
          }}
        />
        <Box
          id='registration-form'
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
            name='email'
            label='Email'
            id='email'
            autoComplete='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          <TextField
            margin='normal'
            name='confirmPassword'
            label='Powtórz hasło'
            type='password'
            id='confirmPassword'
            autoComplete='current-password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Button
            type='button'
            variant='contained'
            disabled={!username || !password}
            color='primary'
            onClick={handleRegister}
            sx={{ mt: 3, mb: 2 }}
          >
            Zarejestruj się
          </Button>
        </Box>
        <Box
          id='back-to-login-button'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography sx={{ paddingBottom: '2rem' }}>
            Masz już konto? <Link to='/login'>Zaloguj się</Link>!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
