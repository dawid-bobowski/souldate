import { Box, Grid } from '@mui/material';
import { PageTitle } from '../common';
import Form from '../common/Form';

function LifestyleTest(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='lifestyle-test-container'
      sx={styles.grid}
    >
      <Box
          id='soulmate-frame'
          sx={{
            ...styles.frame,
            justifyContent: 'center',
          }}
      >
        <PageTitle title='Test zainteresowań' />
        <Form
          type='lifestyle'
          defaultAnswers={DUMMY_DATA}
        />
      </Box>
    </Grid>
  );
}

export default LifestyleTest;

const styles = {
  grid: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224,159,62)',
    background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)'
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: { sm: '1rem' },
    backgroundColor: 'common.white',
    color: 'common.darkGrey',
    borderRadius: '1rem',
    padding: '2rem',
    fontSize: '0.8rem',
    textAlign: 'left',
    marginTop: '2rem',
    boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
  },
};

const DUMMY_DATA: Answers = {
  lf1: 0,
  lf2: 1,
  lf3: 1,
  lf4: 1,
  lf5: 0,
  lf6: 1,
  lf7: 0,
  lf8: 0,
  lf9: 1,
  lf10: 0,
  lf11: 0,
  lf12: 0,
  lf13: 1,
  lf14: 1,
  lf15: 0,
};
