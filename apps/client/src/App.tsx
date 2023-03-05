import Login from '@pages/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: '#f7f7fa',
      },
    },
  });
  return (
    <div className="bg-grey-3">
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    </div>
  );
}

export default App;
