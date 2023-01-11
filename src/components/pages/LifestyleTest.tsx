import { Grid } from '@mui/material';
import _ from 'lodash';
import Form from '../common/Form';

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
      <Form
        type='lifestyle'
        defaultAnswers={DUMMY_DATA}
      />
    </Grid>
  );
}

export default LifestyleTest;

const DUMMY_DATA: Answers = {
  lf1: _.random(0, 1),
  lf2: _.random(0, 1),
  lf3: _.random(0, 1),
  lf4: _.random(0, 1),
  lf5: _.random(0, 1),
  lf6: _.random(0, 1),
  lf7: _.random(0, 1),
  lf8: _.random(0, 1),
  lf9: _.random(0, 1),
  lf10: _.random(0, 1),
  lf11: _.random(0, 1),
  lf12: _.random(0, 1),
  lf13: _.random(0, 1),
  lf14: _.random(0, 1),
  lf15: _.random(0, 1),
};
