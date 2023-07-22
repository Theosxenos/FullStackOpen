import {useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('');

    const addPerson = (event) => {
        event.preventDefault();

        const index = persons.findIndex((person) => person.name === newName);
        if (index >= 0) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        const newPerson = {name: newName, number: newNumber};
        setPersons([...persons, newPerson]);

        setNewName('');
        setNewNumber('');
    }

    const filteredPersons = 
        (persons && filter) ? 
            persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())) 
            : 
            persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={setFilter} filter={filter} />
            <h2>add a new</h2>
            <PersonForm handleAddPerson={addPerson} handleNewName={setNewName} handleNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App