import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_PASSWORD, DEFAULT_USER } from '../../app/constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../features/user/userSlice';
import { PageTitle, TextInput } from '../common';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(DEFAULT_USER);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    if (!username || !password) return;

    try {
      const result = await axios.post(`${API_SERVER}/login?username=${username}&password=${password}`);

      if (result.status === 200) {
        setUsername('');
        setPassword('');
        dispatch(login(result.data));
        navigate('/dashboard');
      } else {
        console.log(
          'Unable to login. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
        );
        alert('Unable to login. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? '');
      }
    } catch (error: any) {
      console.log('Unable to send request. Error message: ' + error.message);
      alert('Unable to send request. Error message: ' + error.message);
    }
  }

  return (
    <div
      id='login-container'
      className='page-container'
    >
      <PageTitle title='Logowanie' />
      <form id='login-form'>
        <TextInput
          type='text'
          value={username}
          setState={setUsername}
        />
        <TextInput
          type='password'
          value={password}
          setState={setPassword}
        />
        <button onClick={handleLogin}>ZALOGUJ</button>
      </form>
    </div>
  );
}

export default Login;
