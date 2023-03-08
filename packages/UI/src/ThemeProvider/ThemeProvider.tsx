import type { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      {children}
    </MantineProvider>
  );
};

export { ThemeProvider };
