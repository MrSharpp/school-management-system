import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { enableLegendStateReact } from '@legendapp/state/react';
  
import '@tremor/react/dist/esm/tremor.css';

enableLegendStateReact();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
