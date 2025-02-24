import React from 'react';
import { fetchApi } from '../../api/fetch.ts';
import { useQuery } from '@tanstack/react-query';
import { defaultState, reducer } from './reducer.ts';

// Types
import { AllProgramsDispatch, AllProgramsState, Program } from './types.ts';

export const fetchAllPrograms = (): Promise<Program[]> => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

export const allProgramsKeys = {
  all: ['allPrograms'] as const,
  filtered: (filters: {
    address: string;
    regions: Array<string>;
    programTypes: Array<string>;
    languages: Array<string>;
    venues: Array<string>;
    audiences: Array<string>;
    organizationName: string;
  }) => [...allProgramsKeys.all, { filters }] as const
};

const useAllPrograms = (): [AllProgramsState, AllProgramsDispatch] => {
  const { data, status, error, isInitialLoading } = useQuery({
    queryKey: allProgramsKeys.all,
    queryFn: fetchAllPrograms,
    retry: false,
    refetchOnWindowFocus: false
  });

  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    if (!isLoading && 'success' === status) {
      dispatch({ type: 'SET', data });
    }

    if ('error' === status) {
      console.error(error);
    }
  }, [status, error, isLoading, data]);

  return [state, dispatch];
};

export default useAllPrograms;
