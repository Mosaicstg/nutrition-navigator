import React from 'react';
import { z } from 'zod';
import { FiltersSchema } from './schema.ts';

export type Filters = z.infer<typeof FiltersSchema>;

export const defaultFilters: Filters = {
  'program-types': [],
  venues: [],
  audiences: [],
  'organization-name': '',
  address: '',
  'metro-areas': []
};

export const useMapFilters = () => {
  return React.useState(() => defaultFilters);
};
