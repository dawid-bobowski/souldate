import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  API_SERVER,
  DEFAULT_PASSWORD,
  DEFAULT_USER,
} from '../../app/constants';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/user/userSlice';
import LoginImage from '../../assets/jonathan-borba-couple.jpg';
import Logo from '../../assets/souldate-logo.png';
import './Login.css';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(DEFAULT_USER);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);

  async function handleLogin(): Promise<void> {
    if (!username || !password) return;

    await axios
      .post(`${API_SERVER}/login?username=${username}&password=${password}`)
      .then((result) => {
        if (result.status === 200) {
          setUsername('');
          setPassword('');
          dispatch(login(result.data));
          navigate('/dashboard');
        } else {
          console.log(
            'Unable to login. HTTP status code: ' +
              result.status +
              '\nError message: ' +
              result.data.errorMsg ?? ''
          );
          alert(
            'Unable to login. HTTP status code: ' +
              result.status +
              '\nError message: ' +
              result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

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
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
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
      <Grid item sm={1} />
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
        <img src={Logo} width={250} />
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
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
