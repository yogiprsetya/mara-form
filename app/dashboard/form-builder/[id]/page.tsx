import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const FormBuilder = dynamic(() => import('../form-builder').then((c) => c.FormBuilder));

const BuildFormPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense>
      <FormBuilder id={id} />
    </Suspense>
  );
};

export default BuildFormPage;
