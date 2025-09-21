import express from 'express';
import dotenv from 'dotenv';

import { chatController } from './controllers/chat.controller';

const app = express();
app.use(express.json());
const PORT = 3000;

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// api endpoint to communicate with the OpenAI API
app.post('/api/chat', chatController.sendMessage);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
