import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/user/userSlice';

function LogoutButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      const result = await axios.get(`http://127.0.0.1:5000/api/logout`);

      if (result.status === 204) {
        dispatch(logout());
        navigate('/');
      } else {
        setIsError(true);
        setErrorMsg('Unable to log out.');
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMsg(error.message);
    }
  }
  return (
    <>
      <button
        id='logout-button'
        onClick={handleLogout}
      >
        Wyloguj
      </button>
      {isError && <span style={{ color: 'red' }}>{errorMsg}</span>}
    </>
  );
}

export default LogoutButton;
