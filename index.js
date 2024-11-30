import express from 'express';
import people from './contact.js';

const app = express();
const port = 3001;

app.get("/api/personas", (req, res) => {
    res.send(people);
});

// step 2
app.get("/info", (req, res) => {
    const ids = people.map(person => person.id);
    const requestTime = new Date();
    res.send(`Phonebook has info for ${ids.length} people <br/>
        ${requestTime}`);
});

app.listen(port, ()=> console.log(`Server running on port ${port}`)); 


