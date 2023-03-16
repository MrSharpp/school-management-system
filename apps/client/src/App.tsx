import AddClass from '@pages/classes/AddClass';
import EditClass from '@pages/classes/EditClass';
import AddStudent from '@pages/Students/AddStudent';
import { AllStudents } from '@pages/Students/AllStudents';
import EditStudent from '@pages/Students/EditStudent';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const Admin = lazy(() => import('@pages/index'));
const LoginPage = lazy(() => import('@pages/auth/Login'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const Teachers = lazy(() => import('@pages/Teachers/AllTeachers'));
const AddTeacher = lazy(() => import('@pages/Teachers/AddTeacher'));
const UpdateTeacher = lazy(() => import('@pages/Teachers/UpdateTeacher'));

const AllClasses = lazy(() => import('@pages/classes/AllClasses'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Admin />}>
            <Route index element={<Dashboard />} />

            <Route path="teachers" element={<Outlet />}>
              <Route index element={<Teachers />} />
              <Route path="new" element={<AddTeacher />} />
              <Route path="edit/:teacherId" element={<UpdateTeacher />} />
            </Route>

            <Route path="students" element={<Outlet />}>
              <Route index element={<AllStudents />} />
              <Route path="new" element={<AddStudent />} />
              <Route path="edit/:studentId" element={<EditStudent />} />
            </Route>

            <Route path="classes" element={<Outlet />}>
              <Route index element={<AllClasses />} />
              <Route path="new" element={<AddClass />} />
              <Route path="edit/:classId" element={<EditClass />} />
            </Route>
          </Route>

          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
