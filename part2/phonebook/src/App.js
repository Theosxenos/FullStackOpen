import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((result) => {
            setPersons(result.data);
        })
    }, []);
    

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