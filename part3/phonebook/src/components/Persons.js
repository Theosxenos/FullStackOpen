const Persons = ({persons, onDeletePersonClick}) => {
    return <>
        {persons.map(
            (person) => 
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={() => onDeletePersonClick(person)}>delete</button>
                </div>
        )}
    </>
}

export default Persons;