import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dasboard } from '@pages/admin/pages/dashboard';

const LoginPage = lazy(() => import('@pages/auth/Login'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dasboard />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
