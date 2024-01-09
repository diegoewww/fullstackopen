import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Message from './components/Message';

import telefonoServices from './services/telefono'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState({ type: null, text: null });

  useEffect(() => {
    telefonoServices.getAll()
      .then(allData => {
        setPersons(allData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


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

    const foundDuplicate = persons.find((person) => person.name === newName);

    if (foundDuplicate) {
      const confirmMessage = `${foundDuplicate.name} is already added to phonebook, replace the old number with a new one?`;
      const shouldReplace = window.confirm(confirmMessage);
      if (shouldReplace) {
        telefonoServices.updateUser(foundDuplicate.id, newPerson)
          .then(dataUpdated => {
            setPersons(persons.map(element => element.id !== foundDuplicate.id ? element : dataUpdated));
            setMessage({ type: 'success', text: `Number updated for ${foundDuplicate.name}` });
            setTimeout(() => {
              setMessage({ type: null, text: null });
            }, 3000);
          })
          .catch(error => {
            setMessage({ type: 'error', text: `Error updating number for ${foundDuplicate.name}` });
            setTimeout(() => {
              setMessage({ type: null, text: null });
            }, 3000);
            setPersons(prevPersons => prevPersons.map(element =>
              element.id !== foundDuplicate.id ? element : null
            ).filter(Boolean));
            console.log(error);
          });
      }
    } else {
      telefonoServices.createUser(newPerson)
        .then(newData => {
          setPersons(persons.concat(newData));
          setNewName('');
          setNewNumber('');
          setMessage({ type: 'success', text: `Added ${newPerson.name}` });
          setTimeout(() => {
            setMessage({ type: null, text: null });
          }, 3000);
        })
        .catch(() => {
          setMessage({ type: 'error', text: 'Error adding new person' });
          setTimeout(() => {
            setMessage({ type: null, text: null });
          }, 3000);
        });
    }
  };

  const deleteUser = (id) => {
    const usertoDelete = persons.find(element => element.id === id)

    if (window.confirm(`DELETE ${usertoDelete.name} ?`)) {
      telefonoServices.deleteUser(id)
        .then(() => {
          const updatedPersons = persons.filter(element => element.id !== id)
          setPersons(updatedPersons)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }

  const filteredPersons = newFilter
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageType={message.type} messageText={message.text} />
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
      <Persons filtered={filteredPersons} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
