import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Tab, Tabs as MuiTabs, Tooltip, Zoom } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import { useAppSelector } from '../../app/hooks';
import LogoutButton from './Navbar/LogoutButton';

function Tabs(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);
  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <>
      <Box sx={{ padding: '12px 16px' }}>
        <Avatar
          variant='circular'
          src={`src/assets/users/${username}.jpg`}
          sx={{ width: '48px', height: '48px' }}
        />
      </Box>
      <MuiTabs
        aria-label='navigation'
        orientation='vertical'
        value={selectedTab}
        TabIndicatorProps={{ sx: { backgroundColor: 'common.primary' } }}
        onChange={(event: React.SyntheticEvent, value: number) => setSelectedTab(value)}
        sx={{ backgroundColor: 'common.white' }}
      >
        <Tab
          to='/dashboard'
          aria-label='dashboard'
          component={Link}
          icon={
            <Tooltip
              title='Strona główna'
              placement='right'
              TransitionComponent={Zoom}
            >
              <DashboardIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />

        <Tab
          to='/personality-test'
          aria-label='personality-test'
          component={Link}
          icon={
            <Tooltip
              title='Test osobowości'
              placement='right'
              TransitionComponent={Zoom}
            >
              <QuizIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
        <Tab
          to='/lifestyle-test'
          aria-label='lifestyle-test'
          component={Link}
          icon={
            <Tooltip
              title='Test zainteresowań'
              placement='right'
              TransitionComponent={Zoom}
            >
              <QuizIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
        <Tab
          to='/your-match'
          aria-label='your-match'
          component={Link}
          icon={
            <Tooltip
              title='Twoje dopasowanie'
              placement='right'
              TransitionComponent={Zoom}
            >
              <Diversity1Icon
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
    color: 'common.primary',
    transition: '0.3s ease-in-out',
    ':hover': {
      color: 'common.primaryDarker',
      transition: '0.3s ease-in-out',
    },
  },
};
