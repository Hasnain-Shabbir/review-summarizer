import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

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

// Always apply min and max to secure the token usage.
const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, 'Prompt is too long (max 100 characters)'),
  conversationId: z.string().uuid(),
});

// api endpoint to communicate with the OpenAI API
app.post('/api/chat', async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: parseResult.error.format() });
    return;
  }

  try {
    const { prompt, conversationId } = req.body;
    const response = await chatService.sendMessage(prompt, conversationId);

    res.json({
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate a response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
