class Person {
    constructor(dbPerson) {
        // eslint-disable-next-line no-underscore-dangle
        this.id = dbPerson._id.toString();
        this.name = dbPerson.name;
        this.number = dbPerson.number;
    }
}

export default Person;
