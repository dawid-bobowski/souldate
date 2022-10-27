import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './components/pages';
import SharedLayout from './components/layouts/SharedLayout';
import PrivateRoute from './helpers/PrivateRoute';
import './App.css';

function App(): JSX.Element {
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
