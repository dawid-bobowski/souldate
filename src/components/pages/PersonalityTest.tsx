import { PageTitle } from '../common';
import schema from '../schemas/schemaPersonalityTestForm.json';

function PersonalityTest(): JSX.Element {
  return (
    <div
      id='personal-test-container'
      className='page-container'
    >
      <PageTitle title='Test osobowości' />
      <form>
        {schema.map((question, index) => {
          return (
            <select
              key={index}
              name={question.name}
              id={question.id}
            >
              {question.options.map((option, index) => {
                return (
                  <option
                    key={index}
                    value={option.value}
                    onClick={() => console.log(option.value)}
                  >
                    {option.text}
                  </option>
                );
              })}
            </select>
          );
        })}
      </form>
    </div>
  );
}

export default PersonalityTest;
