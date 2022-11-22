import { Outlet } from 'react-router-dom';
import { Navbar } from '../common';

function SharedLayout(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default SharedLayout;
