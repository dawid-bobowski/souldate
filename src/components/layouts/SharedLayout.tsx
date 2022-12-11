import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, SwipeableDrawer } from '@mui/material';

import { MobileNavbar, Navbar, Tabs } from '../common';

function SharedLayout(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Grid
      component='div'
      sx={{ display: 'flex', flexDirection: 'row' }}
    >
      <Navbar />
      <MobileNavbar />
      <SwipeableDrawer
        open={isOpen}
        anchor='left'
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        sx={{ display: { sm: 'none' } }}
      >
        <Tabs />
      </SwipeableDrawer>
      <Outlet />
    </Grid>
  );
}

export default SharedLayout;
