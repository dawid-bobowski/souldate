function TextInput(props: TextInputProps): JSX.Element {
  const { type, value, setState } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextInput;
