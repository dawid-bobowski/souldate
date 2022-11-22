import { Grid } from '@mui/material';
import { PageTitle } from '../common';

function Home(): JSX.Element {
  return (
    <Grid container component='main' id='home-container' sx={styles.grid}>
      <PageTitle title='Strona główna' />
      <span>Witaj na stronie głównej!</span>
    </Grid>
  );
}

export default Home;

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
