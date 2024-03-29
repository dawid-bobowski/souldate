import { Grid } from '@mui/material';
import Tabs from '../Tabs';

function Navbar(): JSX.Element {
  return (
    <Grid
      component='div'
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'common.white',
      }}
    >
      <Tabs />
    </Grid>
  );
}

export default Navbar;
