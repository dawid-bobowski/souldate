import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IconButton, Tooltip, Zoom } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/user/userSlice';
import { startLoading, stopLoading, toggleMenu } from '../../../features/app/appSlice';
import { API_SERVER } from '../../../app/constants';
import { refreshPage } from '../../../helpers/utils';

function LogoutButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    await axios
      .get(`${API_SERVER}/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        switch (result.status) {
          case 204:
            dispatch(toggleMenu());
            navigate('/');
            dispatch(logout());
            break;
          case 403:
            console.log(result.data.msg);
            dispatch(startLoading());
            dispatch(toggleMenu());
            dispatch(logout());
            dispatch(stopLoading());
            refreshPage();
          default:
            console.log(
              `Unable to get questions. HTTP status code: ${result.status}\nError message: ${result.data.msg ?? ''}`
            );
            dispatch(logout());
            dispatch(stopLoading());
            navigate('/login', { replace: true });
        }
      })
      .catch((error) => {
        console.log(`Unable to send request. Error message: ${error.message}`);
        dispatch(logout());
        dispatch(stopLoading());
        navigate('/login', { replace: true });
      });
  }

  return (
    <IconButton
      aria-label='logout'
      onClick={handleLogout}
      sx={{
        position: 'absolute',
        bottom: '12px',
        left: '20px',
      }}
    >
      <Tooltip
        title='Wyloguj'
        placement='right'
        TransitionComponent={Zoom}
      >
        <LogoutIcon
          fontSize='large'
          sx={{
            color: 'common.secondary',
            transition: '0.3s ease-in-out',
            ':hover': {
              transition: '0.3s ease-in-out',
            },
          }}
        />
      </Tooltip>
    </IconButton>
  );
}

export default LogoutButton;
