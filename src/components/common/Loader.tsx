import { Box, CircularProgress } from '@mui/material';

function Loader(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgb(0,0,0,0.1)',
        zIndex: 100,
      }}
    >
      <CircularProgress
        size={90}
        sx={{ color: 'common.white' }}
      />
    </Box>
  );
}

export default Loader;
