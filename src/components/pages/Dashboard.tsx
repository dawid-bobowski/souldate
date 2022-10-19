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
      <PageTitle title='Ekran główny' />
      <h2>Witaj {user?.username} na ekranie głównym!</h2>
    </div>
  );
}

export default Dashboard;
