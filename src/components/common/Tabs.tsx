import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideMenu, setTab } from '../../features/app/appSlice';
import { API_SERVER } from '../../app/constants';

import { Avatar, Box, Tab, Tabs as MuiTabs, Tooltip, Zoom } from '@mui/material';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutButton from './Navbar/LogoutButton';

function Tabs(): JSX.Element {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.user.username);
  const { isLoading, currentTab } = useAppSelector((state) => state.app);

  function handleTabChange(event: React.SyntheticEvent, value: number): void {
    dispatch(setTab({ newTab: value }));
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
          src={`${API_SERVER}/users/${username}.jpg`}
          sx={{ width: '48px', height: '48px' }}
        />
      </Box>
      <MuiTabs
        aria-label='navigation'
        orientation='vertical'
        value={currentTab}
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
              <QuestionAnswerRoundedIcon
                fontSize='large'
                sx={styles.icon}
              />
            </Tooltip>
          }
        />
        <Tab
          to='/your-match'
          aria-label='your-match'
          value={2}
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
        <Tab
          to='/premium'
          aria-label='premium'
          value={3}
          component={Link}
          disabled={isLoading}
          icon={
            <Tooltip
              title='Premium (wkrótce)'
              placement='right'
              TransitionComponent={Zoom}
            >
              <WorkspacePremiumRoundedIcon
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
