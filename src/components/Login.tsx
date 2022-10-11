import { useState } from 'react';
import '../App.css'; // temporary

function Login() {
  const [login, setLogin] = useState<string>('user');
  const [password, setPassword] = useState<string>('user');
  function handleLoginChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLogin(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  return (
    <div>
      <h1>Logowanie</h1>
      <form>
        <input type='text' value={login} onChange={handleLoginChange} />
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button>Zaloguj</button>
      </form>
    </div>
  );
}

export default Login;
