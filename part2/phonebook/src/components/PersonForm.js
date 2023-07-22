const PersonForm = ({handleAddPerson, newName, newNumber, handleNewName, handleNewNumber}) => {
    return <form onSubmit={handleAddPerson}>
        <div>
            name: <input value={newName} onChange={(event) => handleNewName(event.target.value)}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={(event) => handleNewNumber(event.target.value)}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default PersonForm;