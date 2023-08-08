import { MongoClient, ObjectId } from 'mongodb';
// eslint-disable-next-line import/extensions
import Person from '../models/Person.js';

class MongoPersonsRepository {
    constructor(url) {
        this.connect(url);
    }

    async connect(url) {
        console.log('connecting');
        try {
            this.client = await MongoClient.connect(url);
            this.collection = this.client.db('phonebookApp')
                .collection('persons');
        } catch (exception) {
            console.error(exception);
            throw new Error('Problems connecting to database');
        }
    }

    countDocuments() {
        return this.collection.countDocuments();
    }

    async getAllPersons() {
        const result = await this.collection.find({})
            .toArray();
        return result.map((p) => new Person(p));
    }

    async getPersonById(id) {
        const objectId = new ObjectId(id);
        const dbPerson = await this.collection.findOne({ _id: objectId });
        if (!dbPerson) return null;

        return new Person(dbPerson);
    }

    async getPersonByName(name) {
        return this.collection.findOne({ name }, {
            collation: {
                locale: 'en',
                strength: 2,
            },
        })
            .then((person) => {
                if (person) {
                    return new Person(person);
                }

                return null;
            });
    }

    async updatePerson(person) {
        const objectId = new ObjectId(person.id);
        const {
            name,
            number,
        } = person;
        const updatedPerson = {
            _id: objectId,
            name,
            number,
        };
        const updateResult = await this.collection
            .findOneAndUpdate({ _id: objectId }, { $set: updatedPerson });

        return new Person(updateResult);
    }

    async deletePerson(id) {
        const objectId = new ObjectId(id);
        const result = await this.collection.deleteOne({ _id: objectId });

        return result.deletedCount;
    }

    async addPerson(newPerson) {
        const person = await this.getPersonByName(newPerson.name);

        if (person) throw new Error('PersonExistsError');

        const result = await this.collection.insertOne(newPerson);
        return this.getPersonById(result.insertedId);
    }
}

export default MongoPersonsRepository;
