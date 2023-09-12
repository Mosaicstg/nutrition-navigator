import React from 'react';
import { ProgramSchema } from './schema.ts';
import { z } from 'zod';
import { Filters } from '../useMapFilters/useMapFilters.tsx';

export type Program = Readonly<z.infer<typeof ProgramSchema>>;

export type AllProgramsState = Readonly<{
  programs: Array<Program>;
  filteredPrograms: Array<Program>;
}>;

export type AllProgramsAction =
  | { type: 'SET'; data: Array<Program> }
  | { type: 'UPDATE_PROGRAMS'; filters: Filters }
  | { type: 'RESET' };

export type MatchAction<T> = Extract<AllProgramsAction, { type: T }>;

export type AllProgramsDispatch = React.Dispatch<AllProgramsAction>;
