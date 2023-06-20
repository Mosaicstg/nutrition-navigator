import { Program } from './schema.ts';

export type Filters = {
  'program-types': string[];
  venues: string[];
  audiences: string[];
  'organization-name': string;
  address: string;
};

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
