import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_EMAIL, DEFAULT_PASSWORD, DEFAULT_USER } from '../../app/constants';
import { PageTitle, TextInput } from '../common';

function Register(): JSX.Element {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(DEFAULT_USER);
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useState<string>(DEFAULT_PASSWORD);
  const [email, setEmail] = useState<string>(DEFAULT_EMAIL);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleRegister(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      const result = await axios.post(
        `${API_SERVER}/register?username=${username}&email=${email}&password=${password}&confirmation=${confirmPassword}`
      );

      if (result.status === 201) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        navigate('/login');
      } else {
        setIsError(true);
        setErrorMsg(result.data.errorMsg);
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
      <PageTitle title='Rejestracja' />
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
