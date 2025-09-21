import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

const app = express();
app.use(express.json());
const PORT = 3000;

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

const conversations = new Map<string, string>();

// api endpoint to communicate with the OpenAI API
app.post('/api/chat', async (req: Request, res: Response) => {
  const { prompt, conversationId } = req.body;

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.2, // we need accurate responses, and for chat we can go with .2
    max_output_tokens: 100,
    previous_response_id: conversations.get(conversationId),
  });

  conversations.set(conversationId, response.id);

  res.json({
    message: response.output_text,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
