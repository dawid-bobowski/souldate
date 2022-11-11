import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    <>
      <button
        id='logout-button'
        onClick={handleLogout}
      >
        Wyloguj
      </button>
    </>
  );
}

export default LogoutButton;
