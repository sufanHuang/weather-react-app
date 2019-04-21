import React from 'react';
import './Form.css'

const Form = ({ handleSubmit }) => {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>Search a City to Compare...</h1>
        <br/>
      <input className='input' type='text' name='city' placeholder='City...' />
      <input className='input' type='text' name='country' placeholder='Country...' />
      <button className='btn btn-outline-info'>Get Weather</button>
    </form>
  );
};

export default Form;