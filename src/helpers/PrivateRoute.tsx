import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

function PrivateRoute({ redirectPath = '/login' }: PrivateRouteProps): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);
  const token: string | null = useAppSelector((state) => state.user.token);

  if (username === null || token === null) {
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
