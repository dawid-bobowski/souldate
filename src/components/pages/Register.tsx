import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle, TextInput } from '../common';

function Register(): JSX.Element {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('user123');
  const [confirmPassword, setConfirmPassword] = useState<string>('user123');
  const [email, setEmail] = useState<string>('user@souldate.pl');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

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
        navigate('/login');
      } else {
        setIsError(true);
        setErrorMsg(resultJson.errorMsg);
      }
    } catch (error: any) {
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
      <PageTitle title='REJESTRACJA' />
      <form id='registrationForm'>
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
        <TextInput
          type='password'
          value={confirmPassword}
          setState={setConfirmPassword}
        />
        <TextInput
          type='email'
          value={email}
          setState={setEmail}
        />
        <button
          onClick={handleRegister}
          disabled={isError}
        >
          ZAREJESTRUJ
        </button>
      </form>
      {isError && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </div>
  );
}

export default Register;
