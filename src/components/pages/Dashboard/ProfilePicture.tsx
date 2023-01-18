import { ChangeEvent, useState } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { startLoading, stopLoading } from '../../../features/app/appSlice';

import { Avatar, Badge, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { API_SERVER } from '../../../app/constants';

function ProfilePicture(): JSX.Element {
  const dispatch = useAppDispatch();
  const username: string | null = useAppSelector((state) => state.user.username);
  const [importedPicture, setImportedPicure] = useState<File>();

  function refreshPage(): void {
    window.location.reload();
  }
  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      dispatch(startLoading());
      setImportedPicure(event.target.files[0]);
      await axios
        .post(
          `${API_SERVER}/upload/profile-picture`,
          { photo: event.target.files[0], username: localStorage.getItem('username') },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((result) => {
          if (result.status === 201) {
            dispatch(stopLoading());
            alert(result.data.msg);
            refreshPage();
          } else {
            dispatch(stopLoading());
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
          dispatch(stopLoading());
          console.log('Unable to send request. Error message: ' + error.message);
          alert('Unable to send request. Error message: ' + error.message);
        });
    }
  }

  return (
    <Badge
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <IconButton
          aria-label='upload picture'
          component='label'
          sx={{
            color: 'common.white',
            backgroundColor: 'common.primary',
            transition: '0.3s ease-in-out',
            ':hover': {
              backgroundColor: 'common.primaryDarker',
              transition: '0.3s ease-in-out',
            },
          }}
        >
          <input
            hidden
            accept='image/*'
            type='file'
            onChange={handlePhotoUpload}
          />
          <PhotoCamera />
        </IconButton>
      }
    >
      <Avatar
        alt={`${username}'s profile picture`}
        src={importedPicture ? URL.createObjectURL(importedPicture) : `../../src/assets/users/${username}.jpg`}
        sx={{ width: 140, height: 140 }}
      />
    </Badge>
  );
}

export default ProfilePicture;
