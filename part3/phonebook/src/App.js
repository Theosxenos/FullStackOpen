import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService"
import Notification from "./components/Notification";
import {NOTIFICATION_TYPES} from "./constants";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationModel, setNotificationModel] = useState({});

    const filteredPersons =
        (persons && filter) ?
            persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
            :
            persons;
    
    useEffect(() => {
        (async () => {
            setPersons(await personsService.getAll());
        })();
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
            showNotification({ message: `Added ${returnedPerson.name}`, type: NOTIFICATION_TYPES.SUCCESS});
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
                showNotification({ message: `updated ${updatedPerson.name}`, type: NOTIFICATION_TYPES.SUCCESS})
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
                showNotification({message: `Person ${person.name} is successfully removed from the server`, type: NOTIFICATION_TYPES.SUCCESS});
            })
            .catch((error) => {
                personsService.getAll().then((persons) => setPersons(persons));
                console.error(error.message);
                showNotification({message: `Information of ${person.name} has already been removed from the server`, type: NOTIFICATION_TYPES.DANGER});
            });
    }
    
    const showNotification = (notificationModel) => {
        setNotificationModel(notificationModel);
        setTimeout(() => setNotificationModel({}), 5_000);
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationModel={notificationModel} />
            <Filter handleFilter={setFilter} filter={filter} />
            <h2>add a new</h2>
            <PersonForm handleAddPerson={handleAddPerson} handleNewName={setNewName} handleNewNumber={setNewNumber} newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} onDeletePersonClick={handleDeletePerson}  />
        </div>
    )
}

export default App