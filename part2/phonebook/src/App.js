import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
      event.preventDefault();
      
      const index = persons.findIndex((person) => person.name === newName);
      if(index >= 0) {
          alert(`${newName} is already added to the phonebook`);
          return;
      }
      
      const newPerson = {name: newName};
      setPersons([...persons, newPerson]);
      setNewName('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <div key={person.name}>{person.name}</div>)}
        </div>
    )
}

export default App