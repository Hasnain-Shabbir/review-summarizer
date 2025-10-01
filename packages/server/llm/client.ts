import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  temperature?: number;
  instructions?: string;
  maxTokens?: number;
  previousResponseId?: string;
};

type GenerateTextResult = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model = 'gpt-4.1',
    prompt,
    temperature = 0.2,
    instructions,
    maxTokens = 300,
    previousResponseId,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    const response = await client.responses.create({
      model,
      input: prompt,
      instructions,
      temperature,
      max_output_tokens: maxTokens,
      previous_response_id: previousResponseId,
    });

    return { text: response.output_text, id: response.id };
  },
};
