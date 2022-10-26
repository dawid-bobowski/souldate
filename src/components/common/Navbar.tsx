import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/user/userSlice';
import './Navbar.css';

function Navbar(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    try {
      const result = await fetch(`http://127.0.0.1:5000/api/logout`, {
        method: 'GET',
      });

      if (result.status === 204) {
        dispatch(logout());
        navigate('/');
      } else {
        setIsError(true);
        setErrorMsg('Unable to log out.');
      }
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setErrorMsg(error.message);
    }
  }

  return (
    <nav id='navbar'>
      <div className='navbar-links'>
        <Link
          className='navbar-link'
          to='/'
        >
          Strona główna
        </Link>
        <Link
          className='navbar-link'
          to='/personality-test'
        >
          Test osobowości
        </Link>
        <Link
          className='navbar-link'
          to='/login'
        >
          Logowanie
        </Link>
        <Link
          className='navbar-link'
          to='/register'
        >
          Rejestracja
        </Link>
      </div>
      {user.username && (
        <button
          id='logout-button'
          onClick={handleLogout}
        >
          Wyloguj
        </button>
      )}
    </nav>
  );
}

export default Navbar;
