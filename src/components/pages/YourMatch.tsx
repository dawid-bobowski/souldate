import { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';
import { API_SERVER } from '../../app/constants';
import '../../App.css';

function YourMatch(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  async function getMatch(): Promise<void> {
    await axios
      .get(`${API_SERVER}/matching`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
        } else {
          console.log(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
          alert(
            'Unable to get match. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ?? ''
          );
        }
      })
      .catch((error) => {
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  useEffect(() => {
    getMatch();
  }, []);

  return (
    <div
      id='dashboard-container'
      className='page-container'
    >
      <PageTitle title='Twoje dopasowanie' />
      <h2>Witaj {username} twoje dopasowanie to: </h2>
    </div>
  );
}

export default YourMatch;
