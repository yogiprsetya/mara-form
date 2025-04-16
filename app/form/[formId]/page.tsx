import { Suspense } from 'react';
import type { Metadata } from 'next';
import { httpClient } from '~/config/http-client';
import { HttpRequest } from '~/model/types/http';
import type { QuestionForms } from '~/model/types/questions';
import dynamic from 'next/dynamic';

const RenderForms = dynamic(() => import('../render-forms').then((mod) => mod.RenderForms));

type Props = {
  params: Promise<{ formId: string }>;
};

const fetchQuestions = (id: string) => {
  return httpClient.get<HttpRequest<QuestionForms>>(`questions/${id}`).then((res) => res.data.data);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { formId } = await params;
  const data = await fetchQuestions(formId);

  return {
    title: data.title
  };
}

const PublicForm = async ({ params }: Props) => {
  const { formId } = await params;
  const data = await fetchQuestions(formId);

  return (
    <Suspense>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-muted-foreground">{data.description}</p>

      <div className="rounded-md border p-4 mt-4">
        <RenderForms questions={data.questions} />
      </div>
    </Suspense>
  );
};

export default PublicForm;
