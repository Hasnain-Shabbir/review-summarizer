import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Button } from '../ui/button';
import { useRef } from 'react';

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: FormData) => {
    reset();

    const { data } = await axios.post('/api/chat', {
      prompt: prompt,
      conversationId: conversationId.current,
    });

    console.log(data);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
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
  );
};

export default ChatBot;
