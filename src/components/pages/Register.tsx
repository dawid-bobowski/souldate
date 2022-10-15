import { useState } from 'react';
import { PageTitle } from '../common';

function Register(): JSX.Element {
  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('user123');
  const [confirmPassword, setConfirmPassword] = useState<string>('user123');
  const [email, setEmail] = useState<string>('user@souldate.pl');

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(event.target.value);
  }
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }
  function handleRegister(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    console.log('Rejestracja!');
  }

  return (
    <div id='registration-container' className='page-container'>
      <PageTitle title='Rejestracja' />
      <form>
        <input type='text' value={username} onChange={handleUsernameChange} />
        <input type='password' value={password} onChange={handlePasswordChange} />
        <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <input type='email' value={email} onChange={handleEmailChange} />
        <button onClick={handleRegister}>Zarejestruj</button>
      </form>
    </div>
  );
}

export default Register;
