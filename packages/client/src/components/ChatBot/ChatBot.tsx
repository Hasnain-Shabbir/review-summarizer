import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button } from '../ui/button';
import { useRef, useState } from 'react';

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  content: string;
  role: 'user' | 'bot';
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
    reset();

    const { data } = await axios.post<ChatResponse>('/api/chat', {
      prompt: prompt,
      conversationId: conversationId.current,
    });

    setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 self-start text-black'}`}
          >
            {message.content}
          </p>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        className="gap-2 flex flex-col items-end border-2 border-gray-300 p-4 rounded-3xl"
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          className="border-0 focus:outline-0 resize-none w-full"
          placeholder="Ask anything"
          maxLength={1000}
        />
        <Button className="rounded-full w-9 h-9" disabled={!formState.isValid}>
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
