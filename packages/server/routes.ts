import express from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// api endpoint to communicate with the OpenAI API
router.post('/api/chat', chatController.sendMessage);
router.get('/api/products/:id/reviews', reviewController.getReviews);
router.get(
  '/api/products/:id/reviews/summarize',
  reviewController.summarizeReviews
);

export default router;
