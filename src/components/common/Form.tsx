import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { setTab, startLoading, stopLoading } from '../../features/app/appSlice';
import { useAppDispatch } from '../../app/hooks';

import { Box, Button, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { API_SERVER, RANDOM_ANSWERS_LIFESTYLE, RANDOM_ANSWERS_PERSONALITY } from '../../app/constants';
import './Form.css';

enum PersonalityFormOption {
  DEFINITELY_AGREE = 'Zdecydowanie zgadzam się z tym stwierdzeniem',
  AGREE = 'Zgadzam się z tym stwierdzeniem',
  NEUTRAL = 'Nie potrafię tego określić',
  DISAGREE = 'Nie zgadzam się z tym stwierdzeniem',
  DEFINITELY_DISAGREE = 'Stanowczo nie zgadzam się z tym stwierdzeniem',
}

enum LifestyleFormOption {
  NO = 'Nie',
  YES = 'Tak',
}

interface IFormProps {
  type: string;
}
type FormProps = IFormProps;

function Form(props: FormProps): JSX.Element {
  const { type } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isPersonality = (): boolean => type === 'personality';

  const [questions, setQuestions] = useState<Questions>([]);
  const [answers, setAnswers] = useState<Answers>(
    isPersonality() ? RANDOM_ANSWERS_PERSONALITY : RANDOM_ANSWERS_LIFESTYLE
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question>();

  const formOptions = (): string[] => {
    switch (type) {
      case 'personality':
        return Object.values(PersonalityFormOption);
      case 'lifestyle':
        return Object.values(LifestyleFormOption);
      default:
        return [];
    }
  };

  function handleNextQuestion(): void {
    if (currentQuestion && currentQuestion.id !== questions.length) {
      setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id + 1));
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, value: string): void {
    const { name } = event.target;

    setAnswers((prevAnswers) => {
      delete prevAnswers[name];
      let newAnswers: Answers = prevAnswers;
      newAnswers[name] = parseInt(value);
      return newAnswers;
    });
    handleNextQuestion();
  }

  async function getQuestions(): Promise<void> {
    dispatch(startLoading());
    await axios
      .get(`${API_SERVER}/${type}_questions`)
      .then((result) => {
        if (result.status === 200) {
          setQuestions(result.data.questions);
          setCurrentQuestion(result.data.questions.find((item: Question) => item.id === 1));
          dispatch(stopLoading());
        } else {
          dispatch(stopLoading());
          console.log(
            'Unable to get questions. HTTP status code: ' +
              result.status +
              '\nError message: ' +
              result.data.errorMsg ?? ''
          );
          alert(
            'Unable to get questions. HTTP status code: ' +
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    dispatch(startLoading());
    await axios
      .post(
        `${API_SERVER}/${type}_test`,
        { answers, username: localStorage.getItem('username') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((result) => {
        if (result.status === 201) {
          dispatch(stopLoading());
          console.log(result.data);
          alert('Data received.');
          dispatch(setTab({ newTab: isPersonality() ? 1 : 2 }));
          navigate(isPersonality() ? '/lifestyle-test' : '/your-match');
        } else {
          dispatch(stopLoading());
          console.log(
            'Unable to post answers. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ??
              ''
          );
          alert(
            'Unable to post answers. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ??
              ''
          );
        }
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Box
      id={`${type}-form`}
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: { xs: '2rem', md: 'unset' },
      }}
    >
      {!_.isUndefined(currentQuestion) && (
        <>
          <Box
            className='form-question'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                color: 'common.white',
                fontFamily: '"Archivo Black",sans-serif',
                padding: '0 5%',
                textAlign: 'center',
                fontSize: { xs: '1.8rem', sm: '3rem' },
              }}
            >
              {currentQuestion.text}:
            </Typography>
            <FormControl
              className='form-option'
              sx={{ display: 'flex', alignItems: 'center', marginTop: '2rem', width: { xs: '90%', sm: 'unset' } }}
            >
              <RadioGroup
                className='form-radiogroup'
                onChange={handleChange}
                sx={{
                  gap: '1rem',
                  padding: { xs: '0 5%', md: 'unset' },
                  display: 'flex',
                  flexDirection: isPersonality() ? 'column' : 'row',
                }}
              >
                {formOptions().map((option, optionIndex) => {
                  return (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex + _.toInteger(isPersonality())}
                      control={<Radio />}
                      label={option}
                      name={currentQuestion.name}
                      checked={answers[currentQuestion.name] === optionIndex + _.toInteger(isPersonality())}
                      sx={{
                        backgroundColor: 'common.white',
                        padding: { xs: '0.5rem 1rem', md: '1rem 2rem' },
                        margin: 0,
                        borderRadius: '3rem',
                        '& .MuiSvgIcon-root': {
                          fontSize: { xs: 20, md: 28 },
                        },
                        '& .MuiFormControlLabel-label': {
                          fontSize: { xs: '0.85rem', md: '1.25rem' },
                        },
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <Button
              disabled={currentQuestion && currentQuestion.id <= 1}
              onClick={() => {
                if (currentQuestion && currentQuestion.id > 1) {
                  setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id - 1));
                }
              }}
              sx={{ color: 'common.white', fontSize: '1.25rem' }}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: '3rem' }} />
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center', color: 'common.white', fontSize: '1.25rem' }}>
              {currentQuestion.id} z {questions.length}
            </Typography>
            <Button
              disabled={currentQuestion && currentQuestion.id >= questions.length}
              onClick={handleNextQuestion}
              sx={{ color: 'common.white', fontSize: '1.25rem' }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: '3rem' }} />
            </Button>
          </Box>
          <Button
            type='submit'
            disabled={isPersonality() ? answers.length === 50 : answers.length === 15}
            sx={{
              color: 'common.white',
              fontSize: { xs: '0.85rem', md: '1rem' },
              borderRadius: '3rem',
              border: '2px solid',
              padding: { xs: '0.5rem 1rem', md: '1rem 2rem' },
              borderColor: 'common.white',
              marginTop: '1rem',
              ':hover': {
                color: 'common.black',
                backgroundColor: 'common.white',
              },
            }}
          >
            Wyślij
          </Button>
        </>
      )}
    </Box>
  );
}

export default Form;
