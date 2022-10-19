import { PageTitle } from '../common';
import '../../App.css';

function Error(): JSX.Element {
  return (
    <div
      id='error-container'
      className='page-container'
    >
      <PageTitle title='Nie ma takiej strony...' />
      <h2>Error 404: Page Not Found</h2>
    </div>
  );
}

export default Error;
