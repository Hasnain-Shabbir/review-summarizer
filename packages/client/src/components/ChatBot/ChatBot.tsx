import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';

const ChatBot = () => {
  return (
    <div className="gap-2 flex flex-col items-end border-2 border-gray-300 p-4 rounded-3xl">
      <textarea
        className="border-0 focus:outline-0 resize-none w-full"
        placeholder="Ask anything"
        maxLength={1000}
      />
      <Button className="rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    </div>
  );
};

export default ChatBot;
