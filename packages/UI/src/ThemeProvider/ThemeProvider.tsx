import type { PropsWithChildren } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = createTheme({});

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export { ThemeProvider };
