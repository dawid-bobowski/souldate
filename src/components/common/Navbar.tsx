import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(): JSX.Element {
  return (
    <nav id='navbar'>
      <Link className='navbar-link' to='/'>
        Strona główna
      </Link>
      <Link className='navbar-link' to='/login'>
        Logowanie
      </Link>
    </nav>
  );
}

export default Navbar;
