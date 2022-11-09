import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

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
        setIsError(true);
        setErrorMsg(result.data.errorMsg);
      }
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
        setErrorMsg('');
      }, 3000);
    }
  }, [isError]);

  return (
    <div
      id='login-container'
      className='page-container'
    >
      <PageTitle title='Logowanie' />
      <form id='loginForm'>
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
      {isError && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </div>
  );
}

export default Login;
