import { Box, Button, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../../app/constants';
import './Form.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

enum PersonalityFormOption {
  DEFINITELY_AGREE = 'Zdecydowanie zgadzam się z tym stwierdzeniem',
  AGREE = 'Zgadzam się z tym stwierdzeniem',
  NEUTRAL = 'Nie potrafię tego określić',
  DISAGREE = 'Nie zgadzam się z tym stwierdzeniem',
  DEFINITELY_DISAGREE = 'Stanowczo nie zgadzam się z tym stwierdzeniem',
}

enum LifestyleFormOption {
  YES = 'Tak',
  NO = 'Nie',
}

function Form(props: FormProps): JSX.Element {
  const { type, defaultAnswers = {} } = props;
  const [questions, setQuestions] = useState<Questions>([]);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, name } = event.target;

    setAnswers((prevAnswers) => {
      delete prevAnswers[name];
      let newAnswers: Answers = prevAnswers;
      newAnswers[name] = parseInt(value);
      return newAnswers;
    });
  }

  async function getQuestions(): Promise<void> {
    await axios
      .get(`${API_SERVER}/${type}_questions`)
      .then((result) => {
        if (result.status === 200) {
          setQuestions(result.data.questions);
        } else {
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
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
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
          console.log(result.data);
          alert('Data received.');
        } else {
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
        console.log('Unable to send request. Error message: ' + error.message);
        alert('Unable to send request. Error message: ' + error.message);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    setCurrentQuestion(questions.find((item) => item.id === 1));
  }, [questions]);

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
      }}
    >
      {currentQuestion ? (
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
                fontSize: '3rem',
              }}
            >
              {currentQuestion.text}:
            </Typography>
            <FormControl
              className='form-option'
              sx={{ marginTop: '2rem' }}
            >
              <RadioGroup
                onChange={handleChange}
                sx={{
                  gap: '1rem',
                }}
              >
                {formOptions().map((option, optionIndex) => {
                  return (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex + 1}
                      control={<Radio />}
                      label={option}
                      sx={{
                        backgroundColor: 'common.white',
                        padding: '1rem 2rem',
                        borderRadius: '3rem',
                        '& .MuiSvgIcon-root': {
                          fontSize: 28,
                        },
                        '& .MuiFormControlLabel-label': {
                          fontSize: '1.25rem',
                        },
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              disabled={currentQuestion && currentQuestion.id <= 1}
              onClick={(event) => {
                event.preventDefault();
                setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id - 1));
              }}
              sx={{ color: 'common.white', fontSize: '1.25rem' }}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: '3rem' }} />
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center', color: 'common.white', fontSize: '1.25rem' }}>
              {currentQuestion.id} z 50
            </Typography>
            <Button
              disabled={currentQuestion && currentQuestion.id >= questions.length - 1}
              onClick={(event) => {
                event.preventDefault();
                setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id + 1));
              }}
              sx={{ color: 'common.white', fontSize: '1.25rem' }}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: '3rem' }} />
            </Button>
          </Box>
          <Button
            type='submit'
            sx={{
              color: 'common.white',
              fontSize: '1rem',
              borderRadius: '3rem',
              border: '2px solid',
              padding: '1rem 2rem',
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
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Form;
