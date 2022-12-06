import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { API_SERVER } from '../../app/constants';

function Dashboard(): JSX.Element {
  const username: string | null = useAppSelector((state) => state.user.username);
  const [importedPicture, setImportedPicure] = useState<File>();

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      setImportedPicure(event.target.files[0]);
      await axios
        .post(
          `${API_SERVER}/upload/profile-picture`,
          { photo: importedPicture, username: localStorage.getItem('username') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((result) => {
          if (result.status === 201) {
            alert(result.data.msg);
          } else {
            console.log(
              'Unable to upload picture. HTTP status code: ' +
                result.status +
                '\nError message: ' +
                result.data.errorMsg ?? ''
            );
            alert(
              'Unable to upload picture. HTTP status code: ' +
                result.status +
                '\nError message: ' +
                result.data.errorMsg ?? ''
            );
          }
        })
        .catch((error) => {
          console.log('Unable to send request. Error message: ' + error.message);
          alert('Unable to send request. Error message: ' + error.message);
        });
    }
  }

  return (
    <Grid
      container
      component='main'
      id='dashboard-container'
      sx={styles.container}
    >
      <Box
        id='dashboard-profile'
        sx={styles.profile}
      >
        <Avatar
          src={importedPicture ? URL.createObjectURL(importedPicture) : `src/assets/users/${username}.jpg`}
          sx={{ width: 140, height: 140 }}
        />
        <Typography variant='h5'>
          Wypełnij test osobowości oraz test zainteresowań i sprawdź swoje aktualne dopasowanie.
        </Typography>
        <IconButton
          aria-label='upload picture'
          component='label'
          sx={styles.uploadIcon}
        >
          <input
            hidden
            accept='image/*'
            type='file'
            onChange={handlePhotoUpload}
          />
          <PhotoCamera />
        </IconButton>
      </Box>
    </Grid>
  );
}

export default Dashboard;

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(224,159,62)',
    background: 'radial-gradient(circle, rgba(224,159,62,1) 0%, rgba(158,42,43,1) 100%)',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'common.darkGrey',
    color: 'common.white',
    borderRadius: '1rem',
    padding: '2rem',
    fontSize: '1.5rem',
    maxWidth: 600,
    textAlign: 'center',
  },
  uploadIcon: {
    color: 'common.white',
  },
};
