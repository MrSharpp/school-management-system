import { AppShell, Header } from '@mantine/core';
import { AdminNavbar } from '@layouts/components/adminNavbar';
import type { PropsWithChildren } from 'react';

export function DefaultAdmin({children}: PropsWithChildren) {
  return (
    <AppShell
      padding="md"
      navbar={<AdminNavbar />}
      header={
        <Header height={60} p="xs">
          Header
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
