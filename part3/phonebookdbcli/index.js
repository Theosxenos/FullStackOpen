import {MongoClient} from "mongodb";

console.log('Connecting to db');
const client = await MongoClient.connect('mongodb://localhost:27017/');
const db = await client.db('phonebookApp');
const collection = db.collection('persons');
console.log('Connected to db')

const cliArgs = process.argv;

if(cliArgs.length === 2) {
    collection.find({}).toArray().then((persons) =>{
        console.log('phonebook:')
        persons.forEach((person) => console.log(person));
        client.close();
    });
}

if(cliArgs.length === 4) {
    const [arg0, arg1, name, number] = cliArgs;
    
    collection.insertOne({name, number}).then((result) => {
        console.log(`added ${name} ${number}`);
        client.close();
    });
}

