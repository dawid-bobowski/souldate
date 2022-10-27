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
      <PageTitle title='EKRAN GŁÓWNY' />
      <h2>WITAJ {user.username} NA EKRANIE GŁÓWNYM!</h2>
    </div>
  );
}

export default Dashboard;
