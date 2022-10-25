import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../common';

function Login({ user, setUser }: LoginProps): JSX.Element {
  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('user123');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    if (!username || !password) return;

    try {
      const result = await fetch(`http://127.0.0.1:5000/api/login?username=${username}&password=${password}`, {
        method: 'GET',
      });
      const resultJson = await result.json();

      if (result.status === 200) {
        console.log(resultJson);
        setUsername('');
        setPassword('');
        setUser({ username: resultJson.username });
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
    if (user) navigate('/dashboard');
  }, []);

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
      <form>
        <input
          type='text'
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>ZALOGUJ</button>
      </form>
      {isError && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </div>
  );
}

export default Login;