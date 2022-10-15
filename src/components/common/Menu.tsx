import { Link } from 'react-router-dom';
import './Menu.css';

function Menu(): JSX.Element {
  return (
    <div id='page-menu'>
      <Link className='menu-link' to='/'>
        Strona główna
      </Link>
      <Link className='menu-link' to='/login'>
        Logowanie
      </Link>
    </div>
  );
}

export default Menu;
