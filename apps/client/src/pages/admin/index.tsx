import  {  ReactNode, Suspense } from 'react';
import { DefaultAdmin } from '@layouts/admin/default';

const Admin = ({component}:{component: ReactNode} ) => {
  return (<>
    <Suspense fallback="Loading...">
      <DefaultAdmin>
        {component}
      </DefaultAdmin>
    </Suspense>
        </>
  );
};

export default Admin;
