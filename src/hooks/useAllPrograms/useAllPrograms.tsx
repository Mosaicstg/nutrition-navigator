import React from 'react';
import { fetchApi } from '../../api/fetch.ts';
import { useQuery } from '@tanstack/react-query';
import { defaultState, reducer } from './reducer.ts';

// Types
import { AllProgramsDispatch, AllProgramsState, Program } from './types.ts';

const fetchAllPrograms = (): Promise<Program[]> => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

const useAllPrograms = (): [AllProgramsState, AllProgramsDispatch] => {
  const { data, status, error, isInitialLoading } = useQuery({
    queryKey: ['allPrograms'],
    queryFn: fetchAllPrograms,
    retry: false,
    refetchOnWindowFocus: false
  });

  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    if (!isInitialLoading && 'success' === status) {
      dispatch({ type: 'SET', data });
    }

    if ('error' === status) {
      console.error(error);
    }
  }, [status, error, isInitialLoading, data]);

  return [state, dispatch];
};

export default useAllPrograms;
