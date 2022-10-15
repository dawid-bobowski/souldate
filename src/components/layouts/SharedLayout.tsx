import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../common';

function SharedLayout(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default SharedLayout;
