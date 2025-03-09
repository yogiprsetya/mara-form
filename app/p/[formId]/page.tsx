import { Suspense } from 'react';
import type { Metadata } from 'next';
import { httpClient } from '~/config/http-client';
import { HttpRequest } from '~/model/types/http';
import type { QuestionForms } from '~/model/types/questions';

type Props = {
  params: Promise<{ formId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { formId } = await params;
  const data = await httpClient
    .get<HttpRequest<QuestionForms>>(`questions/${formId}`)
    .then((res) => res);

  return {
    title: data.data.data.title
  };
}

const PublicForm = () => (
  <Suspense>
    <div />
  </Suspense>
);

export default PublicForm;
