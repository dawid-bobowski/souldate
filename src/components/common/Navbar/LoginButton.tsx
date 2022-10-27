import { useNavigate } from 'react-router-dom';

function LoginButton(): JSX.Element {
  const navigate = useNavigate();

  function handleLogin(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    navigate('/login');
  }
  return (
    <>
      <button
        id='login-button'
        onClick={handleLogin}
      >
        Logowanie
      </button>
    </>
  );
}

export default LoginButton;
