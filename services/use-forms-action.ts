import { useCallback, useState } from 'react';
import { useToast } from '~/hooks/useToast';
import { httpClient } from '~/config/http-client';
import { errorHandler } from '~/utils/error-handler';
import type { HttpRequest } from '~/model/types/http';
import type { CreateFormsType, FormsType } from '~/model/types/forms';
import { useRouter } from 'next/navigation';
import { useFormsData } from './use-forms-data';

export const useFormsAction = () => {
  const [isMutating, setMutating] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useFormsData();

  const deleteProductById = useCallback(
    (id: number) => {
      setMutating(true);

      return httpClient
        .delete<HttpRequest<FormsType>>(`forms/${id}`)
        .then((res) => {
          mutate();

          toast({
            title: 'Forms deleted',
            description: 'A forms deleted successfully',
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

  return {
    isMutating,
    createNewForms,
    deleteProductById
  };
};
