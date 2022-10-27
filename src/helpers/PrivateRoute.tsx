import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

function PrivateRoute({ redirectPath = '/login' }: PrivateRouteProps): JSX.Element {
  const user: User = useAppSelector((state) => state.user);

  // to be used for JWT handling after local storage setup
  function hasJWT(): boolean {
    let flag = false;
    localStorage.getItem('token') ? (flag = true) : (flag = false);
    return flag;
  }

  if (user.username === null) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
