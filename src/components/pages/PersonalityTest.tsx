import { Grid } from '@mui/material';
import { PageTitle } from '../common';
import Form from '../common/Form';

function PersonalityTest(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='personality-test-container'
      sx={styles.grid}
    >
      <PageTitle title='Test osobowości' />
      <Form
        type='personality'
        defaultAnswers={DUMMY_DATA}
      />
    </Grid>
  );
}

export default PersonalityTest;

const styles = {
  grid: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224,159,62)',
    background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
  },
};

const DUMMY_DATA: Answers = {
  EXT1: 5,
  AGR1: 1,
  CSN1: 1,
  EST1: 2,
  OPN1: 3,
  EXT2: 5,
  AGR2: 3,
  CSN2: 4,
  EST2: 4,
  OPN2: 3,
  EXT3: 2,
  AGR3: 2,
  CSN3: 3,
  EST3: 3,
  OPN3: 2,
  EXT4: 2,
  AGR4: 2,
  CSN4: 1,
  EST4: 2,
  OPN4: 5,
  EXT5: 2,
  AGR5: 2,
  CSN5: 1,
  EST5: 5,
  OPN5: 5,
  EXT6: 1,
  AGR6: 1,
  CSN6: 2,
  EST6: 2,
  OPN6: 2,
  EXT7: 2,
  AGR7: 4,
  CSN7: 4,
  EST7: 4,
  OPN7: 1,
  EXT8: 5,
  AGR8: 5,
  CSN8: 2,
  EST8: 5,
  OPN8: 5,
  EXT9: 1,
  AGR9: 3,
  CSN9: 2,
  EST9: 1,
  OPN9: 1,
  EXT10: 5,
  AGR10: 1,
  CSN10: 1,
  EST10: 1,
  OPN10: 1,
};
