import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './utils/config.js';
import 'dotenv/config';
import contactsRouter from './routes/contacts.js';
import { getInfo } from './controllers/contacts.js';
import errorHandler from './middleware/errorHandler.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT LOADED');
console.log('PORT:', process.env.PORT);


await connectDB(process.env.MONGODB_URI);

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());
app.use(express.static('dist'));

// Routes
app.use('/api/persons', contactsRouter);
app.get('/info', getInfo);




app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));