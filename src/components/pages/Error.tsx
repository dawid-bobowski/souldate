import '../../App.css';

function Error(): JSX.Element {
  return (
    <div
      id='error-container'
      className='page-container'
    >
      <h1>Nie ma takiej strony...</h1>
      <h2>Error 404: Page Not Found</h2>
    </div>
  );
}

export default Error;
