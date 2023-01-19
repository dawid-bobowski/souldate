import { TextField, Box, Grid, Typography, Button} from '@mui/material';
import '../../App.css';

function Premium(): JSX.Element {
  return (
    <Grid
      container
      component='main'
      id='dashboard-container'
      sx={{
        width: { xs: '100vw', sm: '100%' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(224,159,62)',
        background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
        paddingTop: { xs: '5rem', sm: '0' },
        paddingBottom: { xs: '5rem', sm: '0' },
      }}
    >
      <Typography
        variant='h2'
        sx={{
          color: 'common.white',
          fontFamily: '"Alexandria", sans-serif',
          fontSize: { xs: '2rem', sm: '3.5rem' },
          marginTop: { xs: '2rem' },
        }}
      >
        Premium
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { sm: '1rem' },
          backgroundColor: 'common.white',
          color: 'common.black',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '2rem',
          boxShadow: '0px 0px 15px -5px rgba(10, 10, 10, 1)',
          width: { xs: '80%', lg: '900px' },
        }}
      >
       
        <TextField
                margin='normal'
                name='name'
                label='Imię i nazwisko'
                id='name'
                autoComplete='Jan Kowalski'
                sx={styles.cardInput}
        />
       <TextField
                margin='normal'
                name='card'
                label='Numer karty'
                id='card'
                autoComplete='1234 5678 9012 3456'
                sx={styles.cardInput}
        />
        <TextField
                margin='normal'
                name='date'
                label='Data wygaśnięcia'
                id='date'
                autoComplete='12/01'
                sx={styles.cardInput}
        />
        <TextField
                margin='normal'
                name='cvv'
                label='CVV'
                id='cvv'
                autoComplete='678'
                sx={styles.cardInput}
        />
        <Button
            type='button'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2, color: 'common.white', textTransform: 'none' }}
          >
        DOKONAJ ZAKUPU
      </Button>
      </Box>
    </Grid>
  );
}

export default Premium;

const styles = {
  cardInput: {
    margin: 0,
  },
};
