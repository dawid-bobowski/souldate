import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Navbar.css';

function Navbar(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);

  return (
    <nav id='navbar'>
      <div className='navbar-links'>
        <Link
          className='navbar-link'
          to='/'
        >
          Strona główna
        </Link>
        {user.username && (
          <Link
            className='navbar-link'
            to='/personality-test'
          >
            Test osobowości
          </Link>
        )}
        {!user.username && (
          <Link
            className='navbar-link'
            to='/register'
          >
            Załóż konto
          </Link>
        )}
      </div>
      {user.username ? <LogoutButton /> : <LoginButton />}
    </nav>
  );
}

export default Navbar;
