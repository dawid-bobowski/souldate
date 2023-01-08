import { Grid } from '@mui/material';
import _ from 'lodash';
import Form from '../common/Form';

function PersonalityTest(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='personality-test-container'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
      }}
    >
      <Form
        type='personality'
        defaultAnswers={DUMMY_DATA}
      />
    </Grid>
  );
}

export default PersonalityTest;

const DUMMY_DATA: Answers = {
  EXT1: _.random(1, 5),
  AGR1: _.random(1, 5),
  CSN1: _.random(1, 5),
  EST1: _.random(1, 5),
  OPN1: _.random(1, 5),
  EXT2: _.random(1, 5),
  AGR2: _.random(1, 5),
  CSN2: _.random(1, 5),
  EST2: _.random(1, 5),
  OPN2: _.random(1, 5),
  EXT3: _.random(1, 5),
  AGR3: _.random(1, 5),
  CSN3: _.random(1, 5),
  EST3: _.random(1, 5),
  OPN3: _.random(1, 5),
  EXT4: _.random(1, 5),
  AGR4: _.random(1, 5),
  CSN4: _.random(1, 5),
  EST4: _.random(1, 5),
  OPN4: _.random(1, 5),
  EXT5: _.random(1, 5),
  AGR5: _.random(1, 5),
  CSN5: _.random(1, 5),
  EST5: _.random(1, 5),
  OPN5: _.random(1, 5),
  EXT6: _.random(1, 5),
  AGR6: _.random(1, 5),
  CSN6: _.random(1, 5),
  EST6: _.random(1, 5),
  OPN6: _.random(1, 5),
  EXT7: _.random(1, 5),
  AGR7: _.random(1, 5),
  CSN7: _.random(1, 5),
  EST7: _.random(1, 5),
  OPN7: _.random(1, 5),
  EXT8: _.random(1, 5),
  AGR8: _.random(1, 5),
  CSN8: _.random(1, 5),
  EST8: _.random(1, 5),
  OPN8: _.random(1, 5),
  EXT9: _.random(1, 5),
  AGR9: _.random(1, 5),
  CSN9: _.random(1, 5),
  EST9: _.random(1, 5),
  OPN9: _.random(1, 5),
  EXT10: _.random(1, 5),
  AGR10: _.random(1, 5),
  CSN10: _.random(1, 5),
  EST10: _.random(1, 5),
  OPN10: _.random(1, 5),
};
