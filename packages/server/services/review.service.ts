import { type Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
  async getReviews(productId: number): Promise<Review[]> {
    return reviewRepository.getReviews(productId);
  },

  async summarizeReviews(productId: number): Promise<string> {
    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedReviews = reviews.map((review) => review.content).join('\n\n');

    const prompt = template.replace('{{reviews}}', joinedReviews);

    if (joinedReviews.trim().length === 0) {
      return 'No reviews available for this product.';
    }

    const response = await llmClient.generateText({
      model: 'gpt-4o-mini',
      prompt,
      temperature: 0.2,
      maxTokens: 500,
    });

    return response.text;
  },
};
