import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_SERVER } from '../../../app/constants';
import './PersonalityForm.css';

enum PersonalityFormOption {
  DEFINITELY_DISAGREE = 'Kategorycznie się nie zgadzam',
  DISAGREE = 'Nie zgadzam się',
  NEUTRAL = 'Neutralna odpowiedź',
  AGREE = 'Zgadzam się',
  DEFINITELY_AGREE = 'Oczywiście że tak!',
}

function PersonalityForm(): JSX.Element {
  const [questions, setQuestions] = useState<Questions>([]);
  const [answers, setAnswers] = useState<Answers>({
    EXT1: 5,
    AGR1: 1,
    CSN1: 1,
    EST1: 2,
    OPN1: 3,
    EXT2: 5,
    AGR2: 3,
    CSN2: 4,
    EST2: 4,
    OPN2: 3,
    EXT3: 2,
    AGR3: 2,
    CSN3: 3,
    EST3: 3,
    OPN3: 2,
    EXT4: 2,
    AGR4: 2,
    CSN4: 1,
    EST4: 2,
    OPN4: 5,
    EXT5: 2,
    AGR5: 2,
    CSN5: 1,
    EST5: 5,
    OPN5: 5,
    EXT6: 1,
    AGR6: 1,
    CSN6: 2,
    EST6: 2,
    OPN6: 2,
    EXT7: 2,
    AGR7: 4,
    CSN7: 4,
    EST7: 4,
    OPN7: 1,
    EXT8: 5,
    AGR8: 5,
    CSN8: 2,
    EST8: 5,
    OPN8: 5,
    EXT9: 1,
    AGR9: 3,
    CSN9: 2,
    EST9: 1,
    OPN9: 1,
    EXT10: 5,
    AGR10: 1,
    CSN10: 1,
    EST10: 1,
    OPN10: 1,
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

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
      const result = await axios.get(`${API_SERVER}/personality_questions`);

      if (result.status === 200) {
        setQuestions(result.data.questions);
      } else {
        setIsError(true);
        setErrorMsg(result.data.errorMsg);
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMsg(error.message);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await axios
      .post(
        `${API_SERVER}/personality_test`,
        { answers, username: localStorage.getItem('username') },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then((result) => {
        if (result.status === 201) {
          console.log(result);
        } else {
          setIsError(true);
          setErrorMsg(result.data.errorMsg);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setErrorMsg(error.message);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <form
      id='personalityForm'
      onSubmit={handleSubmit}
    >
      {questions.map((question, questionIndex) => {
        return (
          <div
            key={questionIndex}
            className='personalityForm-question'
          >
            <h2>{question.text}:</h2>
            {Object.values(PersonalityFormOption).map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='personalityForm-option'
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

export default PersonalityForm;
