import { AllProgramsState, MatchAction } from '../types.ts';

export const updateFilters = ([state, action]: [
  AllProgramsState,
  MatchAction<'UPDATE_FILTERS'>
]): AllProgramsState => {
  const filters = action.data;

  return {
    ...state,
    filters
  };
};
