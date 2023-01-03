import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleMenu } from '../../features/app/appSlice';
import { Outlet } from 'react-router-dom';
import { Grid, SwipeableDrawer } from '@mui/material';
import { MobileNavbar, Navbar, Tabs } from '../common';

function SharedLayout(): JSX.Element {
  const dispatch = useAppDispatch();
  const isMenuOpen: boolean = useAppSelector((state) => state.app.isMenuOpen);

  function handleSwipe(): void {
    dispatch(toggleMenu());
  }

  return (
    <Grid
      component='div'
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Navbar />
      <MobileNavbar />
      <SwipeableDrawer
        open={isMenuOpen}
        anchor='left'
        onClose={handleSwipe}
        onOpen={handleSwipe}
        sx={{ display: { sm: 'none' } }}
      >
        <Tabs />
      </SwipeableDrawer>
      <Outlet />
    </Grid>
  );
}

export default SharedLayout;
