import { useState } from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { PageTitle } from '../common';
import { IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { API_SERVER } from '../../app/constants';

function Dashboard(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);
  const [importedPicture, setImportedPicure] = useState<File>();
  async function handlePhoto(): Promise<void> {
    await axios
      .post(`${API_SERVER}/upload/profile-picture`, {
        // here i dont know what 
      })
    ;
  }
  return (
    <Grid
      container
      component='main'
      id='dashboard-container'
      sx={styles.grid}
    >
      <Avatar
        src={importedPicture ? URL.createObjectURL(importedPicture) : `src/assets/users/${username}.jpg`}
        sx={{ width: 70, height: 70 }}
      />
      <PageTitle title='Dashboard' />
      <span>Cześć, {username}!</span>
      <span>Wypełnij test osobowości oraz test zainteresowań i sprawdź swoje aktualne dopasowanie.</span>
      <span>Koniecznie wgraj lub zaktualizuj swoje zdjęcie ;)</span>
      <IconButton
        aria-label='upload picture'
        component='label'
        onClick={handlePhoto}
      >
        <input
          hidden
          accept='image/*'
          type='file'
          onChange={(event) => event.target.files && setImportedPicure(event.target.files[0])}
        />
        <PhotoCamera />
      </IconButton>
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
