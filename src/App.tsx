import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearError, setTab, startLoading, stopLoading } from './features/app/appSlice';
import { login } from './features/user/userSlice';
import SharedLayout from './components/layouts/SharedLayout';
import PrivateRoute from './helpers/PrivateRoute';
import * as Pages from './components/pages';
import '@mui/material/styles/createPalette';
import './App.css';
import { Loader } from './components/common';
import Snackbar from '@mui/material/Snackbar/Snackbar';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    primary: string;
    primaryDarker: string;
    secondary: string;
    secondaryDarker: string;
    white: string;
    grey: string;
    lightGrey: string;
    darkGrey: string;
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
      secondaryDarker: '#631819',
      white: '#FFF',
      lightGrey: '#E4E4E4',
      grey: '#afafaf',
      darkGrey: '#111111',
      black: '#0A0A0A',
    },
  },
});

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.app.isLoading);
  const isError: boolean = useAppSelector((state) => state.app.isError);
  const errorMsg: string = useAppSelector((state) => state.app.errorMsg);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    dispatch(setTab({ newTab: 0 }));

    if (token !== null && username !== null) {
      dispatch(startLoading());
      dispatch(login({ username, token }));
      dispatch(stopLoading());
    }
  }, []);

  function handleCloseError(): void {
    dispatch(clearError());
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loader />}
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={handleCloseError}
        message={errorMsg}
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '3rem',
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
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
          <Route element={<PrivateRoute />}>
            <Route element={<SharedLayout />}>
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
              <Route
                path='/premium'
                element={<Pages.Premium />}
              />
            </Route>
          </Route>
          <Route
            path='*'
            element={<Pages.Error />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
