// Types
import { AllProgramsState, MatchAction } from '../types.ts';

export const reset = ([state]: [
  AllProgramsState,
  MatchAction<'RESET'>
]): AllProgramsState => {
  const { programs } = state;

  return {
    ...state,
    filteredPrograms: programs
  };
};
