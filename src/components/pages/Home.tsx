import { PageTitle } from '../common';

function Home(): JSX.Element {
  return (
    <div
      id='home-container'
      className='page-container'
    >
      <PageTitle title='Strona główna' />
      <h2>Witaj na stronie głównej!</h2>
    </div>
  );
}

export default Home;
