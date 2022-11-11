import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

function PrivateRoute({ redirectPath = '/login' }: PrivateRouteProps): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);

  if (username === null) {
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
