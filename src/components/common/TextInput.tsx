interface TextInputProps {
  type: string;
  value: string;
  setState: any;
}

function TextInput(props: TextInputProps): JSX.Element {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setState(event.target.value);
  }
  return (
    <input
      {...props}
      onChange={handleChange}
    />
  );
}

export default TextInput;
