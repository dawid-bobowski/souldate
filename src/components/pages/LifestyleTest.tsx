import { Grid } from '@mui/material';
import _ from 'lodash';
import { Form } from '../common';

function LifestyleTest(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='lifestyle-test-container'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        alignItems: 'center',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
        marginTop: { xs: '5rem', sm: 'unset' },
      }}
    >
      <Form type='lifestyle' />
    </Grid>
  );
}

export default LifestyleTest;
