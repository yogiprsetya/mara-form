import { FormWithQuestionsType } from '~/model/types/forms';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';

type Options = {
  id?: string;
};

export const useFormsId = (opt?: Options) => {
  const { data, isLoading } = useSWR<HttpRequest<FormWithQuestionsType>, Error>(
    !opt?.id ? null : `forms/q:${opt.id}`,
    { revalidateOnFocus: false }
  );

  return {
    data,
    isLoading
  };
};
