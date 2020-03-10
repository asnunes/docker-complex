import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);


  async function fetchValues() {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }

  async function fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  }

  async function onSubmit(event) {
    event.preventDefault();
    await axios.post('api/values', { index });
    setIndex('');
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={e => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
        {seenIndexes.join(', ')}
      <h3>Calculated Values:</h3>
        <Values values={values}/>
    </>
  )
}

function Values({ values }) {
  function getEntries(values) {
    values.map((key) => (
      <div key={key}>
        For index {key}, I calculated values[key]
      </div>
    ));
  }
}

export default Fib;