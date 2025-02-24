import { Suspense } from 'react';
import { InitNewForms } from './init-new-forms';

const ManageFormPage = () => (
  <Suspense>
    <InitNewForms />
  </Suspense>
);

export default ManageFormPage;
