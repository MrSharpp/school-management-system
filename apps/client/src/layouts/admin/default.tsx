import { AppShell, Header } from '@mantine/core';
import { AdminNavbar } from '@layouts/components/adminNavbar';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function DefaultAdmin({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth/login');
    }
  }, []);
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
