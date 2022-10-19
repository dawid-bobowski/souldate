import { useEffect, useState } from 'react';
import { PageTitle } from '../common';

function Register(): JSX.Element {
  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('user123');
  const [confirmPassword, setConfirmPassword] = useState<string>('user123');
  const [email, setEmail] = useState<string>('user@souldate.pl');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

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
  async function handleRegister(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      const result = await fetch(
        `http://127.0.0.1:5000/api/register?username=${username}&email=${email}&password=${password}&confirmation=${confirmPassword}`,
        { method: 'POST' }
      );
      const resultJson = await result.json();

      if (result.status === 201) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        console.log(resultJson);
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
      id='registration-container'
      className='page-container'
    >
      <PageTitle title='Rejestracja' />
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
        <input
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
        />
        <button
          onClick={handleRegister}
          disabled={isError}
        >
          Zarejestruj
        </button>
      </form>
      {isError && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </div>
  );
}

export default Register;
