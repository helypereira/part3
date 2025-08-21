import express from 'express';
import people from './contact.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));
app.use(express.json());

const port = 3001;

app.get("/api/persons", (req, res) => {
    res.json(people);
});

app.get("/info", (req, res) => {
    const ids = people.map(person => person.id);
    const requestTime = new Date();
    res.send(`Phonebook has info for ${ids.length} people <br/>
        ${requestTime}`);
});

app.get("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find(person => person.id === id);
    person ? res.json(person) : res.status(404).send({message: 'contact no found'})
})

app.delete("/api/persons/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    people.filter(person => person.id !== id)
    res.status(204).end();
});


app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({ message: 'Name and number are required' });
    }

    const nameExists = people.some(p => p.name === name);
    if (nameExists) {
        return res.status(409).json({ message: 'Name must be unique' });
    }

    const maxId = Math.max(...people.map(pers => pers.id));
    const newId = maxId + 1;

    const newPerson = { id: newId, name, number };

    people.push(newPerson);

    res.status(201).json(newPerson);
});


app.listen(port, ()=> console.log(`Server running on port ${port}`)); 