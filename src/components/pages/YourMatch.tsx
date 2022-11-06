import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';
import '../../App.css';

function YourMatch(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);

  return (
    <div
      id='dashboard-container'
      className='page-container'
    >
      <PageTitle title='Twoje dopasowanie' />
      <h2>Witaj {user.username} twoje dopasowanie to: </h2>
    </div>
  );
}

export default YourMatch;