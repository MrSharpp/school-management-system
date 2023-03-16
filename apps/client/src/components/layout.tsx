import { AppShell, Container, Header } from '@mantine/core';
import { AdminNavbar } from '@components/adminNavbar';
import { Suspense, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminHeader from '@components/AdminHeader';

function DefaultAdmin() {
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
      header={<AdminHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Suspense fallback="Loading...">
        <Container fluid pl={'sm'} pt="sm" p="xl">
          <Outlet />
        </Container>
      </Suspense>
    </AppShell>
  );
}

export { DefaultAdmin };
