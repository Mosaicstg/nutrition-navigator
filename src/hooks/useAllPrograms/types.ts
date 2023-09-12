import React from 'react';
import { ProgramSchema } from './schema.ts';
import { z } from 'zod';
import { Filters } from '../useMapFilters/useMapFilters.tsx';

export type Program = z.infer<typeof ProgramSchema>;

export type AllProgramsState = Readonly<{
  programs: Program[];
  filteredPrograms: Program[];
}>;

export type AllProgramsAction =
  | { type: 'SET'; data: ReadonlyArray<Program> }
  | { type: 'UPDATE_PROGRAMS'; filters: Readonly<Filters> }
  | { type: 'RESET' };

export type MatchAction<T> = Extract<AllProgramsAction, { type: T }>;

export type AllProgramsDispatch = React.Dispatch<AllProgramsAction>;
