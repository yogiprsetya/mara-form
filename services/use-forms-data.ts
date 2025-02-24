import { Forms } from '~/model/types/forms';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const LIMIT = 10;

type Options = {
  disabled?: boolean;
  sort?: 'asc' | 'desc';
  page?: number;
};

export const useFormsData = (opt?: Options) => {
  const [keyword, setSearchKeyword] = useState('');

  const params = new URLSearchParams({
    keyword,
    limit: LIMIT.toString(),
    sort: opt?.sort || '',
    page: opt?.page?.toString() || ''
  });

  const { data, isLoading, mutate } = useSWR<HttpRequest<Forms[]>, Error>(
    opt?.disabled ? null : `forms?${params.toString()}`
  );

  return {
    data,
    isLoading,
    mutate,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500)
  };
};
