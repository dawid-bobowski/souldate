import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { login } from './features/user/userSlice';
import SharedLayout from './components/layouts/SharedLayout';
import PrivateRoute from './helpers/PrivateRoute';
import * as Pages from './components/pages';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    secondary: Palette['secondary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    secondary?: PaletteOptions['secondary'];
  }
}

const theme = createTheme({
  palette: {
    neutral: {
      main: '#e09f3e',
      contrastText: '#0a0a0a',
    },
    secondary: {
      main: '#9e2a2b',
      contrastText: '#fff',
    },
  },
});

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (token !== null && username !== null) {
      dispatch(login({ username, token }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
              path='/register'
              element={<Pages.Register />}
            />
            <Route
              path='*'
              element={<Pages.Error />}
            />
          </Route>
          <Route
            path='/login'
            element={<Pages.Login />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
