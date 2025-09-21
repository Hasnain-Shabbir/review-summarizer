import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// public interface
// Leaky abstraction - no other modules should no which model we are using, but if we return the response form OpenAI then they will know.

const parkInfo = fs.readFileSync(
  path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
  'utf-8'
);

const instructions = template.replace('{{parkInfo}}', parkInfo);

interface ChatResponse {
  id: string;
  message: string;
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions,
      input: prompt,
      temperature: 0.2, // we need accurate responses, and for chat we can go with .2
      max_output_tokens: 100,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text,
    };
  },
};
