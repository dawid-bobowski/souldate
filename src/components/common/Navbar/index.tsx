import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, Tooltip, Zoom} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LogoutButton from './LogoutButton';
import './Navbar.css';

function Navbar(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Tabs
      aria-label='navigation'
      orientation='vertical'
      value={selectedTab}
      TabIndicatorProps={{ sx: styles.tabsIndicator }}
      onChange={(event: React.SyntheticEvent, value: number) =>
        setSelectedTab(value)
      }
      sx={styles.tabs}
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
            <DashboardIcon fontSize='large' sx={styles.icon} />
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
            <QuizIcon fontSize='large' sx={styles.icon} />
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
            <QuizIcon fontSize='large' sx={styles.icon} />
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
            <Diversity1Icon fontSize='large' sx={styles.icon} />
          </Tooltip>
        }
      />
      <LogoutButton />
    </Tabs>
  );
}

export default Navbar;

const styles = {
  tabs: {
    top: 0,
    left: 0,
    position: 'fixed',
    height: '100%',
    backgroundColor: 'common.white',
  },
  tabsIndicator: {
    backgroundColor: 'common.primary',
  },
  icon: {
    color: 'common.primary',
    transition: '0.3s ease-in-out',
    ':hover': {
      color: 'common.primaryDarker',
      transition: '0.3s ease-in-out',
    },
  },
};
