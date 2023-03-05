import Login from '@pages/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme();
  return (
    <div className="bg-grey-3">
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    </div>
  );
}

export default App;
