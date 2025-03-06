import { useCallback, useState } from 'react';
import { useToast } from '~/hooks/useToast';
import { httpClient } from '~/config/http-client';
import { errorHandler } from '~/utils/error-handler';
import type { HttpRequest } from '~/model/types/http';
import type { CreateFormsType, FormsType } from '~/model/types/forms';
import { useRouter } from 'next/navigation';
import { useFormsData } from './use-forms-data';
import { CreateQuestionsType } from '~/model/types/questions';

export const useFormsAction = () => {
  const [isMutating, setMutating] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useFormsData();

  const deleteFormById = useCallback(
    (id: string) => {
      setMutating(true);

      return httpClient
        .delete<HttpRequest<FormsType>>(`forms/${id}`)
        .then((res) => {
          mutate();

          toast({
            title: 'Forms deleted',
            description: 'A forms and related fields are deleted successfully',
            duration: 2500
          });

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [toast, mutate]
  );

  const createNewForms = useCallback(
    (form: CreateFormsType) => {
      setMutating(true);

      return httpClient
        .post<HttpRequest<FormsType>>('forms', form)
        .then((res) => {
          toast({
            title: 'Forms created',
            description: 'New forms added successfully',
            duration: 2500
          });

          router.push(`/dashboard/form-builder/${res.data.data.id}`);

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [router, toast]
  );

  const formBuilder = useCallback(
    (data: CreateQuestionsType) => {
      setMutating(true);

      return httpClient
        .post<HttpRequest<FormsType>>('questions', data)
        .then((res) => {
          toast({
            title: 'Forms updated',
            description: 'Now, you can share this forms with your audience',
            duration: 2500
          });

          router.push('/dashboard');

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [router, toast]
  );

  const updateDataForms = useCallback(
    ({ id, title, description }: CreateFormsType) => {
      setMutating(true);

      return httpClient
        .put<HttpRequest<FormsType>>(`forms/${id}`, { title, description })
        .then((res) => {
          mutate();

          toast({
            title: 'Forms updated',
            duration: 2500
          });

          return res.data;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [mutate, toast]
  );

  return {
    isMutating,
    createNewForms,
    updateDataForms,
    deleteFormById,
    formBuilder
  };
};
