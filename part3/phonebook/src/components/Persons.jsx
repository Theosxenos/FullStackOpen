import React from 'react';

function Persons(prop) {
    const { persons, onDeletePersonClick } = prop;
    return (
        <>
            {persons.map(
                (person) => (
                    <div key={person.id}>
                        {person.name}
                        {' '}
                        {person.number}
                        {' '}
                        <button type="button" onClick={() => onDeletePersonClick(person)}>delete</button>
                    </div>
                ),
            )}
        </>
    );
}

export default Persons;
