import { useState } from 'react';
import schema from '../../schemas/schemaPersonalityTestForm.json';
import './PersonalityForm.css';

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
            {question.options.map((option, optionIndex) => {
              return (
                <div
                  key={optionIndex}
                  className='personalityForm-option'
                >
                  <input
                    type='radio'
                    name={question.name}
                    value={option.value}
                  />
                  <label>{option.text}</label>
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
