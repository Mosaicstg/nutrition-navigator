import * as v from 'valibot';
import { ProgramSchema } from '../schema.ts';

// Types
import { AllProgramsState, MatchAction } from '../types.ts';

export const set = ([state, action]: [
  AllProgramsState,
  MatchAction<'SET'>
]): AllProgramsState => {
  const programs = action.data;

  const validatedPrograms = programs.filter((program) => {
    const validation = v.safeParse(ProgramSchema, program);

    if (!validation.success) {
      console.error(
        `Program with name: "${program.name}" is invalid`,
        validation.issues
      );
    }

    return validation.success;
  });

  return {
    ...state,
    programs: validatedPrograms,
    filteredPrograms: validatedPrograms
  };
};
