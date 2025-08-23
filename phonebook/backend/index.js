import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './utils/config.js';
import 'dotenv/config';
import contactsRouter from './routes/contacts.js';
import { getInfo } from './controllers/contacts.js';
import errorHandler from './middleware/errorHandler.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT LOADED');
console.log('PORT:', process.env.PORT);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve the frontend for any other route (catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));