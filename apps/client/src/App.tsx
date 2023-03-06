import Login from '@pages/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
