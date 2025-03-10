import { Suspense } from 'react';
import { FormsDataTable } from './manage-forms/form-data-table';

const ManageFormPage = () => (
  <Suspense>
    <FormsDataTable />
  </Suspense>
);

export default ManageFormPage;
