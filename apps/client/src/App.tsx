import { Dasboard } from '@pages/admin/pages/dashboard';
import { Teachers } from '@pages/admin/pages/teachers';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Admin = lazy(() => import('@pages/admin/index'));
const LoginPage = lazy(() => import('@pages/auth/Login'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            // not sure if its the correct way for nested routing // its 1:35AM,
            had to do it anyhow
            <Route path="/" element={<Admin component={<Dasboard />} />} />
            <Route
              path="/teachers"
              element={<Admin component={<Teachers />} />}
            />
          </Route>
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
