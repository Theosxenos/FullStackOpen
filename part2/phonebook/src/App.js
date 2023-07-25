import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService"
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    const filteredPersons =
        (persons && filter) ?
            persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
            :
            persons;
    
    useEffect(() => {
        personsService.getAll().then((persons) => setPersons(persons));
    }, []);
    
    const handleAddPerson = (event) => {
        event.preventDefault();

        const index = persons.findIndex((person) => person.name === newName);
        if (index >= 0) {
            updatePerson(persons[index]);
            
            return;
        }
        
        addPerson();
    }
    
    const addPerson = () => {
        const newPerson = {name: newName, number: newNumber};
        personsService.addPerson(newPerson).then((returnedPerson) => {
            setPersons([...persons, returnedPerson]);
            showNotification(`Added ${returnedPerson.name}`);
            setNewName('');
            setNewNumber('');
        });
    }
    
    const updatePerson = (person) => {
        const userConfirmation = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);

        if (!userConfirmation) return;

        personsService
            .updatePerson(person.id, {...person, number: newNumber})
            .then((updatedPerson) => {
                setPersons(persons.map((p) => p.id !== updatedPerson.id ? p : updatedPerson));
                showNotification(`updated ${updatedPerson.name}`);
                setNewName('');
                setNewNumber('');
            });
    }
    
    const handleDeletePerson = (person) => {
        if(!window.confirm(`Delete ${person.name} ?`)) return;

        deletePerson(person);
    }
    
    const deletePerson = (person) => {
        personsService.deletePerson(person.id)
            .then((result) => {
                const newPersonsArray = persons.filter(p => p.id !== person.id);
                setPersons(newPersonsArray);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    }
    
    const showNotification = (message) => {
        setNotificationMessage(message);
        setTimeout(() => setNotificationMessage(''), 5_000);
    }
    

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <Filter handleFilter={setFilter} filter={filter} />
            <h2>add a new</h2>
            <PersonForm handleAddPerson={handleAddPerson} handleNewName={setNewName} handleNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} onDeletePersonClick={handleDeletePerson}  />
        </div>
    )
}

export default App