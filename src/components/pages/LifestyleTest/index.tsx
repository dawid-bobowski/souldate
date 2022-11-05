import { PageTitle } from '../../common';
import LifestyleForm from './LifestyleForm';

function LifestyleTest(): JSX.Element {
  return (
    <div
      id='lifestyle-test-container'
      className='page-container'
    >
      <PageTitle title='Test zainteresowań' />
      <LifestyleForm />
    </div>
  );
}

export default LifestyleTest;
