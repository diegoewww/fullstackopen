import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const foundDuplicate = persons.some((person) => person.name === newName);

    if (foundDuplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = newFilter
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleChangeFilter={handleFilterChange}
        newFilter={newFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        handleChangeName={handleNameChange}
        newName={newName}
        handleChangeNumber={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filtered={filteredPersons} />
    </div>
  );
};

export default App;
