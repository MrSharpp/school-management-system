import { useState } from 'react';
import { observable } from '@legendapp/state';

const count = observable(0);

function App() {
  const [, s] = useState(0);

  return (
    <div className="App">
      hello world
      <button
        onClick={() => {
          count.set(count.peek() + 1);
        }}
      >
        increment {count}
      </button>
    </div>
  );
}

export default App;
