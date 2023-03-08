import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Admin = lazy(() => import('@pages/admin/index'));
const LoginPage = lazy(() => import('@pages/auth/Login'));
const Dashboard = lazy(() => import('@pages/admin/pages/dashboard'));
const Teachers = lazy(
  () => import('@pages/admin/pages/Teachers/All Teachers/AllTeachers')
);
const AddTeacher = lazy(
  () => import('@pages/admin/pages/Teachers/AddTeacher')
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/new" element={<AddTeacher />} />
          </Route>

          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
