import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';
import '../../App.css';

function Dashboard(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  return (
    <div
      id='dashboard-container'
      className='page-container'
    >
      <PageTitle title='Ekran główny' />
      <h2>Witaj {username} na ekranie głównym!</h2>
    </div>
  );
}

export default Dashboard;
