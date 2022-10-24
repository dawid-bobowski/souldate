import { PageTitle } from '../common';

function Home(): JSX.Element {
  return (
    <div
      id='home-container'
      className='page-container'
    >
      <PageTitle title='STRONA GŁÓWNA' />
      <h2>STWÓRZ KONTO I ZNAJDŹ SWOJĄ BRATNIĄ DUSZĘ</h2>
    </div>
  );
}

export default Home;
