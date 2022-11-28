import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../../app/constants';
import './Form.css';

enum PersonalityFormOption {
  DEFINITELY_DISAGREE = 'Stanowczo nie zgadzam się z tym stwierdzeniem',
  DISAGREE = 'Nie zgadzam się z tym stwierdzeniem',
  NEUTRAL = 'Nie potrafię tego określić',
  AGREE = 'Zgadzam się z tym stwierdzeniem',
  DEFINITELY_AGREE = 'Zdecydowanie zgadzam się z tym stwierdzeniem',
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
    <form
      id={`${type}-form`}
      className='form'
      onSubmit={handleSubmit}
    >
      {currentQuestion ? (
        <>
          <div className='form-question'>
            <h2>{currentQuestion.text}:</h2>
            {formOptions().map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='form-option'
                >
                  <input
                    type='radio'
                    name={currentQuestion.name}
                    value={optionIndex + 1}
                    onChange={handleChange}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
          </div>
          <>
            <button
              disabled={currentQuestion && currentQuestion.id <= 1}
              onClick={(event) => {
                event.preventDefault();
                setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id - 1));
              }}
            >
              Poprzednie pytanie
            </button>
            <button type='submit'>Wyślij</button>
            <button
              disabled={currentQuestion && currentQuestion.id >= questions.length - 1}
              onClick={(event) => {
                event.preventDefault();
                setCurrentQuestion(questions.find((item) => item.id === currentQuestion.id + 1));
              }}
            >
              Następne pytanie
            </button>
          </>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}

export default Form;
