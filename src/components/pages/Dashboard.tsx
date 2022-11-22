import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';

function Dashboard(): JSX.Element {
  const username: string | null = useAppSelector(
    (state) => state.user.username
  );

  return (
    <Grid container component='main' id='dashboard-container' sx={styles.grid}>
      <PageTitle title='Dashboard' />
      <span>Cześć, {username}!</span>
      <span>Wypełnij test osobowości oraz test zainteresowań i sprawdź swoje aktualne dopasowanie.</span>
    </Grid>
  );
}

export default Dashboard;

const styles = {
  grid: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'common.lightGrey',
  },
};
