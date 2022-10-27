import { useState } from 'react';
import schema from '../../schemas/schemaPersonalityTestForm.json';
import './PersonalityForm.css';

enum PersonalityFormOption {
  DEFINITELY_DISAGREE = 'Kategorycznie się nie zgadzam',
  DISAGREE = 'Nie zgadzam się',
  NEUTRAL = 'Neutralna odpowiedź',
  AGREE = 'Zgadzam się',
  DEFINITELY_AGREE = 'Oczywiście że tak!',
}

function PersonalityForm(): JSX.Element {
  const [answers, setAnswers] = useState({});
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(event);
    console.log('POST personality-test');
  }
  return (
    <form
      id='personalityForm'
      onSubmit={handleSubmit}
    >
      {schema.map((question, index) => {
        return (
          <div
            key={index}
            className='personalityForm-question'
          >
            <h2>{question.text}</h2>
            {Object.values(PersonalityFormOption).map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='personalityForm-option'
                >
                  <input
                    type='radio'
                    name={question.name}
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
