import { useAppDispatch } from '../../app/hooks';
import { toggleMenu } from '../../features/app/appSlice';
import { Box } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logo from '../../assets/souldate-logo.png';

function MobileNavbar(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleMenuClick(): void {
    dispatch(toggleMenu());
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
        zIndex: 100,
        boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
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
      <Box
        component='img'
        src={Logo}
        width={150}
        sx={{ marginRight: '1rem' }}
      />
    </Box>
  );
}

export default MobileNavbar;
