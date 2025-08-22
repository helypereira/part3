import express from 'express';
import people from './contact.js';
import morgan from 'morgan';
import cors from 'cors';

let contacts = people;
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());
app.use(express.static('dist'));
app.get("/api/persons", (req, res) => {
    res.json(contacts);
});

app.get("/info", (req, res) => {
    const ids = contacts.map(person => person.id);
    const requestTime = new Date();
    res.send(`Phonebook has info for ${ids.length} people <br/>
        ${requestTime}`);
});

app.get("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const person = contacts.find(person => person.id === id);
    person ? res.json(person) : res.status(404).send({message: 'contact no found'})
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const personToDelete = contacts.find(person => person.id === id);
    
    if (!personToDelete) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    
    contacts = contacts.filter(person => person.id !== id);
    res.status(204).end();
});


app.post("/api/persons", (req, res) => {
    try {
        const { name, number } = req.body;
        const newContact = { id: contacts.length + 1, name, number };
        contacts.push(newContact);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({ message: 'Name and number are required' });
    }

    const nameExists = contacts.some(p => p.name === name);
    if (nameExists) {
        return res.status(409).json({ message: 'Name must be unique' });
    }

    const maxId = Math.max(...contacts.map(pers => pers.id));
    const newId = maxId + 1;

    const newPerson = { id: newId, name, number };

    contacts.push(newPerson);

    res.status(201).json(newPerson);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));