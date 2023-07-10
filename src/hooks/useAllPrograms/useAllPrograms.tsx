import React from 'react';
import { fetchApi } from '../../api/fetch.ts';
import { defaultState, reducer } from './reducer.ts';
import { Program } from './types.ts';

const fetchAllPrograms = () => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

const useAllPrograms = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    fetchAllPrograms()
      .then((res: Program[]) => {
        // Set start state of programs
        dispatch({ type: 'SET', data: res });
      })
      .catch((err) => {
        console.error(
          'Something went wrong when trying to retrieve Programs data:'
        );
        console.error(err);
      });
  }, [dispatch]);

  return { state, dispatch };
};

export default useAllPrograms;
