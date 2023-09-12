import React from 'react';
import { z } from 'zod';
import { FiltersSchema } from './schema.ts';

export type Filters = Readonly<z.infer<typeof FiltersSchema>>;

export const defaultFilters: Filters = {
  'program-types': [],
  venues: [],
  audiences: [],
  'organization-name': '',
  address: '',
  'metro-areas': []
};

export const useMapFilters = (): [
  Readonly<Filters>,
  React.Dispatch<React.SetStateAction<Readonly<Filters>>>
] => {
  return React.useState(() => defaultFilters);
};
