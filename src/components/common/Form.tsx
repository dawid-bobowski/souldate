import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../../app/constants';
import './Form.css';

enum PersonalityFormOption {
  DEFINITELY_DISAGREE = 'Kategorycznie się nie zgadzam',
  DISAGREE = 'Nie zgadzam się',
  NEUTRAL = 'Neutralna odpowiedź',
  AGREE = 'Zgadzam się',
  DEFINITELY_AGREE = 'Oczywiście że tak!',
}

enum LifestyleFormOption {
  YES = 'Tak',
  NO = 'Nie',
}

function Form(props: FormProps): JSX.Element {
  const { type, defaultAnswers = {} } = props;
  const [questions, setQuestions] = useState<Questions>([]);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);

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
    try {
      const result = await axios.get(`${API_SERVER}/${type}_questions`);

      if (result.status === 200) {
        setQuestions(result.data.questions);
      } else {
        console.log(
          'Unable to get questions. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ??
            ''
        );
        alert(
          'Unable to get questions. HTTP status code: ' + result.status + '\nError message: ' + result.data.errorMsg ??
            ''
        );
      }
    } catch (error: any) {
      console.log('Unable to send request. Error message: ' + error.message);
      alert('Unable to send request. Error message: ' + error.message);
    }
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

  return (
    <form
      id={`${type}-form`}
      className='form'
      onSubmit={handleSubmit}
    >
      {questions.map((question, questionIndex) => {
        return (
          <div
            key={questionIndex}
            className='form-question'
          >
            <h2>{question.text}:</h2>
            {formOptions().map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='form-option'
                >
                  <input
                    type='radio'
                    name={question.id}
                    value={optionIndex + 1}
                    onChange={handleChange}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
          </div>
        );
      })}
      <button type='submit'>Wyślij</button>
    </form>
  );
}

export default Form;
