import { PageTitle } from '../../common';
import PersonalityForm from './PersonalityForm';

function PersonalityTest(): JSX.Element {
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
