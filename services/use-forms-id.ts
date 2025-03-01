import { FormsType } from '~/model/types/forms';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';

type Options = {
  id?: string;
};

export const useFormsId = (opt?: Options) => {
  const { data, isLoading } = useSWR<HttpRequest<FormsType>, Error>(
    !opt?.id ? null : `forms/${opt.id}`,
    { revalidateOnFocus: false }
  );

  return {
    data,
    isLoading
  };
};
