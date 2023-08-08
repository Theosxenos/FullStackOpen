import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/personsService';
import Notification from './components/Notification';
import NOTIFICATION_TYPES from './constants';

function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationModel, setNotificationModel] = useState({});

    const filteredPersons = (persons && filter)
        ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        : persons;

    useEffect(() => {
        (async () => {
            setPersons(await personsService.getAll());
        })();
    }, []);

    const showNotification = (model) => {
        setNotificationModel(model);
        setTimeout(() => setNotificationModel({}), 5_000);
    };

    const updatePerson = async (person) => {
        console.log('update person', person);
        const userConfirmation = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);

        if (!userConfirmation) return;

        try {
            const updatedPerson = await personsService
                .updatePerson(person.id, { ...person, number: newNumber });
            setNewName('');
            setNewNumber('');
            setPersons(await personsService.getAll());
            showNotification({ message: `updated ${updatedPerson.name}`, type: NOTIFICATION_TYPES.SUCCESS });
        } catch (error) {
            console.error(error);
            showNotification({ message: `Error while updating ${person.name}`, type: NOTIFICATION_TYPES.DANGER });
        }
    };

    const addPerson = () => {
        const newPerson = { name: newName, number: newNumber };
        personsService.addPerson(newPerson).then((returnedPerson) => {
            setPersons([...persons, returnedPerson]);
            showNotification({ message: `Added ${returnedPerson.name}`, type: NOTIFICATION_TYPES.SUCCESS });
            setNewName('');
            setNewNumber('');
        }).catch(async (error) => {
            console.error('addPerson error', error);
            if (error.response.status !== 409) {
                showNotification({ message: `Error while adding ${newPerson.name}`, type: NOTIFICATION_TYPES.DANGER });
                return;
            }

            const person = await personsService.getPersonByName(newPerson.name);
            updatePerson({ ...newPerson, id: person.id });
        });
    };

    const handleAddPerson = (event) => {
        event.preventDefault();

        addPerson();
    };

    const deletePerson = (person) => {
        personsService.deletePerson(person.id)
            .then(() => {
                const newPersonsArray = persons.filter((p) => p.id !== person.id);
                setPersons(newPersonsArray);
                showNotification({
                    message: `Person ${person.name} is successfully removed from the server`,
                    type: NOTIFICATION_TYPES.SUCCESS,
                });
            })
            .catch((error) => {
                personsService.getAll().then((result) => setPersons(result));
                console.error(error.message);
                showNotification({
                    message: `Information of ${person.name} has already been removed from the server`,
                    type: NOTIFICATION_TYPES.DANGER,
                });
            });
    };

    const handleDeletePerson = (person) => {
        if (!window.confirm(`Delete ${person.name} ?`)) return;

        deletePerson(person);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationModel={notificationModel} />
            <Filter handleFilter={setFilter} filter={filter} />
            <h2>add a new</h2>
            <PersonForm
                handleAddPerson={handleAddPerson}
                handleNewName={setNewName}
                handleNewNumber={setNewNumber}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} onDeletePersonClick={handleDeletePerson} />
        </div>
    );
}

export default App;
