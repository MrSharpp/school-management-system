import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { enableLegendStateReact } from '@legendapp/state/react';
import { ThemeProvider } from 'ui';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@APIService/queryClient';

enableLegendStateReact();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
