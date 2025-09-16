import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching message:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold">Hello World</h2>
      <p>{message}</p>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
