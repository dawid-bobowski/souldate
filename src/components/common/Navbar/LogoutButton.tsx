import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IconButton, Tooltip, Zoom } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/user/userSlice';

function LogoutButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    await axios
      .get(`http://127.0.0.1:5000/api/logout`)
      .then((result) => {
        if (result.status === 204) {
          dispatch(logout());
          navigate('/');
        } else {
          console.log(
            'Unable to log out. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to log out. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  return (
    <IconButton
      aria-label='logout'
      onClick={handleLogout}
      sx={styles.logoutButton}
    >
      <Tooltip
        title='Wyloguj'
        placement='right'
        TransitionComponent={Zoom}
      >
        <LogoutIcon
          fontSize='large'
          sx={styles.icon}
        />
      </Tooltip>
    </IconButton>
  );
}

export default LogoutButton;

const styles = {
  icon: {
    color: 'common.primary',
    transition: '0.3s ease-in-out',
    ':hover': {
      color: 'common.primaryDarker',
      transition: '0.3s ease-in-out',
    },
  },
  logoutButton: {
    position: 'absolute',
    bottom: '12px',
    left: '20px',
  },
};
