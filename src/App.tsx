import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './components/pages';
import SharedLayout from './components/layouts/SharedLayout';
import PrivateRoute from './helpers/PrivateRoute';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { login } from './features/user/userSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      dispatch(login(loggedInUser));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<SharedLayout />}
        >
          <Route element={<PrivateRoute />}>
            <Route
              path='/dashboard'
              element={<Pages.Dashboard />}
            />
            <Route
              path='/personality-test'
              element={<Pages.PersonalityTest />}
            />
            <Route
              path='/lifestyle-test'
              element={<Pages.LifestyleTest />}
            />
            <Route
              path='/your-match'
              element={<Pages.YourMatch />}
            />
          </Route>
          <Route
            index
            element={<Pages.Home />}
          />
          <Route
            path='/login'
            element={<Pages.Login />}
          />
          <Route
            path='/register'
            element={<Pages.Register />}
          />
          <Route
            path='*'
            element={<Pages.Error />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
