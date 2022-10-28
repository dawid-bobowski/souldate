import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';
import '../../App.css';

function Dashboard(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);

  return (
    <div
      id='dashboard-container'
      className='page-container'
    >
      <PageTitle title='Ekran główny' />
      <h2>Witaj {user.username} na ekranie głównym!</h2>
    </div>
  );
}

export default Dashboard;
