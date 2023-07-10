import React from 'react';
import { FiltersSchema, ProgramSchema } from './schema.ts';
import { z } from 'zod';

export type Program = z.infer<typeof ProgramSchema>;
export type Filters = z.infer<typeof FiltersSchema>;

export type AllProgramsState = {
  filters: Filters;
  programs: Program[];
  filteredPrograms: Program[];
};

export type AllProgramsAction =
  | { type: 'SET'; data: Program[] }
  | { type: 'UPDATE_FILTERS'; data: Filters }
  | { type: 'UPDATE_PROGRAMS'; data?: Program[] }
  | { type: 'RESET' };

export type MatchAction<T> = Extract<AllProgramsAction, { type: T }>;

export type AllProgramsDispatch = React.Dispatch<AllProgramsAction>;
