import schema from '../../schemas/schemaPersonalityTestForm.json';

function PersonalityForm() {
  return (
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
  );
}

export default PersonalityForm;
