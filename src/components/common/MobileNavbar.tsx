import { useState } from 'react';
import { Box } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logo from '../../assets/souldate-logo.png';

function MobileNavbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleMenuClick(): void {
    setIsOpen(!isOpen);
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '5rem',
        position: 'fixed',
        top: 0,
        backgroundColor: 'common.white',
      }}
    >
      <MenuOpenIcon
        onClick={handleMenuClick}
        sx={{
          fontSize: 48,
          marginLeft: 2,
          color: 'common.secondary',
        }}
      />
      <img
        src={Logo}
        width={150}
        style={{
          position: 'relative',
          top: '0.25rem',
          overflow: 'hidden',
        }}
      />
    </Box>
  );
}

export default MobileNavbar;
