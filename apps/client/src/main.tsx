import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { enableLegendStateReact } from '@legendapp/state/react';
import { ThemeProvider } from 'ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

enableLegendStateReact();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
