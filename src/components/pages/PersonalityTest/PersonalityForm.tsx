import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [answers, setAnswers] = useState();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('POST personality-test');
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

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <form
      id='personalityForm'
      onSubmit={handleSubmit}
    >
      {questions.map((question, index) => {
        return (
          <div
            key={index}
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
                    value={optionIndex}
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
