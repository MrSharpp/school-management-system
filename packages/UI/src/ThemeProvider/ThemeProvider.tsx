import type { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <ModalsProvider>
      {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export { ThemeProvider };
