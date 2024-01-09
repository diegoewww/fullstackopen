
const Persons = ({ filtered, deleteUser }) => {
  return (
    <div>
      {
        filtered.map((person) => (
          <div key={person.name}>
            {person.name} {person.number} <button onClick={() => deleteUser(person.id)}>DELETE {person.id}</button>
          </div>

        ))
      }
    </div>
  );
};

export default Persons;