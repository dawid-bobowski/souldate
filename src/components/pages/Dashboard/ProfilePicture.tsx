import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setError, startLoading, stopLoading } from '../../../features/app/appSlice';
import { logout } from '../../../features/user/userSlice';
import { API_SERVER } from '../../../app/constants';
import { refreshPage } from '../../../helpers/utils';

import { Avatar, Badge, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function ProfilePicture(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const username: string | null = useAppSelector((state) => state.user.username);
  const [importedPicture, setImportedPicure] = useState<File>();

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (event.target.files) {
      const file: File | null = event.target.files[0];
      dispatch(startLoading());
      await axios
        .post(
          `${API_SERVER}/profile-picture`,
          { photo: file },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((result) => {
          switch (result.status) {
            case 201:
              setImportedPicure(file);
              dispatch(stopLoading());
              refreshPage();
              break;
            case 403:
              dispatch(logout());
              dispatch(stopLoading());
              navigate('/login', { replace: true });
              dispatch(setError({ msg: result.data.msg }));
              break;
            case 404:
              refreshPage();
              dispatch(setError({ msg: result.data.msg }));
            default:
              dispatch(logout());
              dispatch(stopLoading());
              navigate('/login', { replace: true });
              dispatch(
                setError({
                  msg: `Unable to get questions. HTTP status code: ${result.status}\nError message: ${
                    result.data.msg ?? ''
                  }`,
                })
              );
          }
        })
        .catch((error) => {
          dispatch(logout());
          dispatch(stopLoading());
          navigate('/login', { replace: true });
          dispatch(
            setError({
              msg: `Unable to send request. Error message: ${error.message}`,
            })
          );
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
        src={importedPicture ? URL.createObjectURL(importedPicture) : `${API_SERVER}/users/${username}.jpg`}
        sx={{ width: 140, height: 140 }}
      />
    </Badge>
  );
}

export default ProfilePicture;
