import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../../../app/constants';
import './LifestyleForm.css';

enum LifestyleFormOption {
  YES = 'Tak',
  NO = 'Nie',
}

function LifestyleForm(): JSX.Element {
  const [questions, setQuestions] = useState<Questions>([]);
  const [answers, setAnswers] = useState<Answers>({
    lf1: 0,
    lf2: 1,
    lf3: 1,
    lf4: 1,
    lf5: 0,
    lf6: 1,
    lf7: 0,
    lf8: 0,
    lf9: 1,
    lf10: 0,
    lf11: 0,
    lf12: 0,
    lf13: 1,
    lf14: 1,
    lf15: 0,
  });

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
      const result = await axios.get(`${API_SERVER}/lifestyle_questions`);

      if (result.status === 200) {
        setQuestions(result.data.questions);
      } else {
        console.log(result.data.errorMsg);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await axios
      .post(`${API_SERVER}/lifestyle_test`, answers)
      .then((result) => {
        if (result.status === 201) {
          console.log(result);
        } else {
          console.log(result.data.errorMsg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <form
      id='lifestyleForm'
      onSubmit={handleSubmit}
    >
      {questions.map((question, questionIndex) => {
        return (
          <div
            key={questionIndex}
            className='lifestyleForm-question'
          >
            <h2>{question.text}:</h2>
            {Object.values(LifestyleFormOption).map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='lifestyleForm-option'
                >
                  <input
                    type='radio'
                    name={question.id}
                    value={optionIndex}
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

export default LifestyleForm;
