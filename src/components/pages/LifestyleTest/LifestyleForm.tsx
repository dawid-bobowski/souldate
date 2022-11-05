import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_SERVER } from '../../../app/constants';
import './LifestyleForm.css';

function LifestyleForm(): JSX.Element {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('POST lifestyle-test');
  }

  return (
    <form
      id='lifestyleForm'
      onSubmit={handleSubmit}
    >
      <button type='submit'>Wyślij</button>
    </form>
  );
}

export default LifestyleForm;
