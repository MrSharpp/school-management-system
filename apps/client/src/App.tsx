import { useEffect, useState } from 'react';
import { observable } from '@legendapp/state';
import { useObserveEffect } from '@legendapp/state/react';
import { Button, Card, Text } from '@tremor/react';

const state = observable({ count: 0 });

function increment() {
  state.count.set(prev => ++prev);
}

function App() {
  return (
    <div className="App">
      <Card>
        <Text>hello world {state.count} </Text>

        <Button
          marginTop={'mt-3'}
          onClick={increment}
        >
          increment {state.count}
        </Button>
      </Card>
    </div>
  );
}

export default App;
