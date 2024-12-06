import express from 'express';
import people from './contact.js';

const app = express();
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
    person ? res.send(person) : res.status(404).send({message: 'person no found'})
})


app.listen(port, ()=> console.log(`Server running on port ${port}`)); 


