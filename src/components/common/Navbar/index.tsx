import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Navbar.css';

function Navbar(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  return (
    <nav id='navbar'>
      <div className='navbar-links'>
        <Link
          className='navbar-link'
          to='/'
        >
          Strona główna
        </Link>
        {username ? (
          <>
            <Link
              className='navbar-link'
              to='/personality-test'
            >
              Test osobowości
            </Link>
            <Link
              className='navbar-link'
              to='/lifestyle-test'
            >
              Test zainteresowań
            </Link>
            <Link
              className='navbar-link'
              to='/your-match'
            >
              Twoje dopasowanie
            </Link>
          </>
        ) : (
          <Link
            className='navbar-link'
            to='/register'
          >
            Załóż konto
          </Link>
        )}
      </div>
      {username ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}

export default Navbar;
