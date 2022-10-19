import { PageTitle } from '../common';

function Home(): JSX.Element {
  return (
    <div
      id='home-container'
      className='page-container'
    >
      <PageTitle title='Strona główna' />
      <h2>To jest strona powitalna!</h2>
    </div>
  );
}

export default Home;
