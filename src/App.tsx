import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useAppDispatch } from './app/hooks';
import { useCookies } from 'react-cookie';
import { login } from './features/user/userSlice';
import SharedLayout from './components/layouts/SharedLayout';
import PrivateRoute from './helpers/PrivateRoute';
import * as Pages from './components/pages';
import '@mui/material/styles/createPalette';
import './App.css';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    primary: string;
    primaryDarker: string;
    secondary: string;
    white: string;
    lightGrey: string;
    black: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#E09F3E',
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: '#9E2A2B',
      contrastText: '#fff',
    },
    common: {
      primary: '#E09F3E',
      primaryDarker: '#A57608',
      secondary: '#9E2A2B',
      white: '#FFF',
      lightGrey: '#E4E4E4',
      black: '#0A0A0A',
    },
  },
});

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (username !== null) {
      dispatch(login({ username }));
      setCookie('token', cookies.token, { path: '/', maxAge: 600 });
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
