import type { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
};

export { ThemeProvider };
