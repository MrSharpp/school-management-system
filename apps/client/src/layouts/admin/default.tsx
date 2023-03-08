import { AppShell, Header } from '@mantine/core';
import { AdminNavbar } from '@layouts/components/adminNavbar';
import { Suspense, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminHeader from '@layouts/components/AdminHeader';

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
        <Outlet />
      </Suspense>
    </AppShell>
  );
}

export { DefaultAdmin };
