import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { PageTitle } from '../../common';
import PersonalityForm from './PersonalityForm';

function PersonalityTest(): JSX.Element {
  const user: User = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === null) navigate('/login');
  }, []);

  return (
    <div
      id='personal-test-container'
      className='page-container'
    >
      <PageTitle title='Test osobowości' />
      <PersonalityForm />
    </div>
  );
}

export default PersonalityTest;
