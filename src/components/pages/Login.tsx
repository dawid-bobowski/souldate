import { useState } from 'react';
import { PageTitle } from '../common';
import './Login.css';

function Login(): JSX.Element {
  const [login, setLogin] = useState<string>('user');
  const [password, setPassword] = useState<string>('user');

  function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLogin(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }
  function handleLogin(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    console.log(`Użytkownik: ${login}\nHasło: ${password}`);
  }

  return (
    <div id='login-container' className='page-container'>
      <PageTitle title='Logowanie' />
      <form>
        <input type='text' value={login} onChange={handleLoginChange} />
        <input type='password' value={password} onChange={handlePasswordChange} />
        <button onClick={handleLogin}>Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
