import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../common';
import '../../App.css';

function Dashboard({ user }: DashboardProps): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return (
    <div
      id='dashboard-container'
      className='page-container'
    >
      <PageTitle title='EKRAN GŁÓWNY' />
      <h2>WITAJ {user?.username} NA EKRANIE GŁÓWNYM!</h2>
    </div>
  );
}

export default Dashboard;
