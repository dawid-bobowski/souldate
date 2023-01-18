import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideMenu } from '../../features/app/appSlice';

import { Avatar, Box, Tab, Tabs as MuiTabs, Tooltip, Zoom } from '@mui/material';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import LogoutButton from './Navbar/LogoutButton';

function Tabs(): JSX.Element {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const username: string | null = useAppSelector((state) => state.user.username);
  const isLoading: boolean = useAppSelector((state) => state.app.isLoading);

  function handleTabChange(event: React.SyntheticEvent, value: number): void {
    setSelectedTab(value);
    dispatch(hideMenu());
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 16px',
        }}
      >
        <Avatar
          variant='circular'
          src={`../../src/assets/users/${username}.jpg`}
          sx={{ width: '48px', height: '48px' }}
        />
      </Box>
      <MuiTabs
        aria-label='navigation'
        orientation='vertical'
        value={selectedTab}
        TabIndicatorProps={{ sx: { backgroundColor: 'common.secondary' } }}
        onChange={handleTabChange}
      >
        <Tab
          to='/dashboard'
          aria-label='dashboard'
          value={0}
          component={Link}
          disabled={isLoading}
          icon={
            <Tooltip
              title='Strona główna'
              placement='right'
              TransitionComponent={Zoom}
            >
              <DashboardRoundedIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />

        <Tab
          to='/personality-test'
          aria-label='personality-test'
          value={1}
          component={Link}
          disabled={isLoading}
          icon={
            <Tooltip
              title='Test osobowości'
              placement='right'
              TransitionComponent={Zoom}
            >
              <QuizRoundedIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
        <Tab
          to='/lifestyle-test'
          aria-label='lifestyle-test'
          value={2}
          component={Link}
          disabled={isLoading}
          icon={
            <Tooltip
              title='Test zainteresowań'
              placement='right'
              TransitionComponent={Zoom}
            >
              <QuizRoundedIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
        <Tab
          to='/your-match'
          aria-label='your-match'
          value={3}
          component={Link}
          disabled={isLoading}
          icon={
            <Tooltip
              title='Twoje dopasowanie'
              placement='right'
              TransitionComponent={Zoom}
            >
              <Diversity1RoundedIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
      </MuiTabs>
      <LogoutButton />
    </>
  );
}

export default Tabs;

const styles = {
  icon: {
    color: 'common.secondary',
    transition: '0.3s ease-in-out',
    ':hover': {
      color: 'common.secondaryDarker',
      transition: '0.3s ease-in-out',
    },
  },
};
