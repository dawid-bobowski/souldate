import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useAppDispatch } from './app/hooks';
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
      main: '#e09f3e',
      contrastText: '#0a0a0a',
    },
    secondary: {
      main: '#9e2a2b',
      contrastText: '#fff',
    },
    common: {
      primary: '#E09F3E',
      primaryDarker: '#a57608',
      secondary: '#9E2A2B',
      white: '#FFF',
      lightGrey: '#e4e4e4',
      black: '#0f0f0f',
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
          <Route path='/' element={<SharedLayout />}>
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Pages.Dashboard />} />
              <Route
                path='/personality-test'
                element={<Pages.PersonalityTest />}
              />
              <Route path='/lifestyle-test' element={<Pages.LifestyleTest />} />
              <Route path='/your-match' element={<Pages.YourMatch />} />
            </Route>
            <Route index element={<Pages.Home />} />
            <Route path='/register' element={<Pages.Register />} />
            <Route path='*' element={<Pages.Error />} />
          </Route>
          <Route path='/login' element={<Pages.Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
