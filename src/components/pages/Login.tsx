import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../features/user/userSlice';
import { PageTitle, TextInput } from '../common';

function Login(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('user123');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    if (!username || !password) return;

    try {
      const result = await fetch(`http://127.0.0.1:5000/api/login?username=${username}&password=${password}`, {
        method: 'GET',
      });
      const resultJson = await result.json();

      if (result.status === 200) {
        setUsername('');
        setPassword('');
        dispatch(login(resultJson.username));
        navigate('/dashboard');
      } else {
        setIsError(true);
        setErrorMsg(resultJson.errorMsg);
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
      <PageTitle title='LOGOWANIE' />
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
