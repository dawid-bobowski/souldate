import { PageTitle } from '../common';
import Form from '../common/Form';

function LifestyleTest(): JSX.Element {
  return (
    <div
      id='lifestyle-test-container'
      className='page-container'
    >
      <PageTitle title='Test zainteresowań' />
      <Form
        type='lifestyle'
        defaultAnswers={DUMMY_DATA}
      />
    </div>
  );
}

export default LifestyleTest;

const DUMMY_DATA: Answers = {
  lf1: 0,
  lf2: 1,
  lf3: 1,
  lf4: 1,
  lf5: 0,
  lf6: 1,
  lf7: 0,
  lf8: 0,
  lf9: 1,
  lf10: 0,
  lf11: 0,
  lf12: 0,
  lf13: 1,
  lf14: 1,
  lf15: 0,
};
