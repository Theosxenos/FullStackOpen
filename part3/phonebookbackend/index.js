import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// eslint-disable-next-line import/extensions
import MongoPersonsRepository from './services/MongoPersonsRepository.js';

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
// app.use(morgan('tiny'));

const mongoPersonsRepository = new MongoPersonsRepository('mongodb://localhost:27017');

app.get('/info', async (request, response) => {
    const count = await mongoPersonsRepository.countDocuments();
    const personsAmountMessage = `Phonebook has info for ${count} people`;
    const now = Date();

    console.log(`${personsAmountMessage}\n${now}`);

    response.send(`<p>${personsAmountMessage}</p><p>${now}</p>`);
});

app.get('/api/persons', (request, response, next) => {
    mongoPersonsRepository.getAllPersons()
        .then((persons) => {
            response.json(persons);
        })
        .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id.toString();

    mongoPersonsRepository.getPersonById(id)
        .then((person) => {
            if (!person) throw new Error('personNotFoundError');

            response.json(person);
        })
        .catch((error) => next(error));
});

app.get('/api/persons/name/:name', (request, response, next) => {
    const name = request.params.name.toString();

    mongoPersonsRepository.getPersonByName(name)
        .then((person) => {
            if (!person) throw new Error('personNotFoundError');

            response.json(person);
        })
        .catch(next);
});

app.delete('/api/persons/:id', async (request, response, next) => {
    const id = request.params.id.toString();

    try {
        const deletedCount = await mongoPersonsRepository.deletePerson(id);

        if (deletedCount <= 0) {
            next(new Error('personNotFoundError'));
        }
    } catch (error) {
        next(error);
    }

    return response.status(204)
        .end();
});

app.post('/api/persons', (request, response, next) => {
    const { body } = request;

    // if (!body.name) {
    //     throw new Error('newPersonNameMissingError');}
    // } else if (!body.number) {
    //     throw new Error('newPersonPhoneMissingError');
    // }

    mongoPersonsRepository.addPerson(body)
        .then((person) => {
            response.json(person);
        })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const { body } = request;

    if (!body.name) {
        throw new Error('newPersonNameMissingError');
    } else if (!body.number) {
        throw new Error('newPersonPhoneMissingError');
    }

    mongoPersonsRepository.updatePerson(body)
        .then((person) => response.json(person))
        .catch(next);
});

app.use((request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' });
});

app.use((error, request, response) => {
    console.error('errorHandler', error);

    if (error.name === 'BSONError') {
        return response.status(400)
            .send({ error: 'malformatted id' });
    }
    if (error.codeName === 'DocumentValidationFailure' || error.code === 121) {
        return response.status(400)
            .json({ error: 'document failed validation' });
    }
    if (error.message === 'personNotFoundError') {
        return response.status(404)
            .send({ error: 'person not found' });
    }
    if (error.message === 'PersonExistsError') {
        return response.status(409)
            .send({ error: 'person already exists' });
    }

    return response.status(500)
        .send({ error: 'unknown server error' });
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
