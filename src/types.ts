export type Filters = {
  'program-types': string[];
  venues: string[];
  audiences: string[];
  'organization-name': string;
  address: string;
};

export type Program = {
  'program-name': string;
  url: string;
  latitude: number;
  longitude: number;
  'organization-name': string;
  'organization-url': string;
  'program-types': string[];
  audiences: string[];
  venues: string[];
  description?: string;
  address?: string;
  name?: string;
  'contact-phone'?: string;
  'contact-email'?: string;
  'dates-times-offered'?: string;
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
