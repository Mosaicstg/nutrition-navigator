import { Filters } from '../hooks/useMapFilters/useMapFilters.tsx';
import { createFakeSlugs } from './helpers.ts';
import { faker } from '@faker-js/faker';

export function createFakeMapFilters(): Filters {
  return {
    'program-types': createFakeSlugs(),
    'metro-areas': createFakeSlugs(),
    venues: createFakeSlugs(),
    audiences: createFakeSlugs(),
    languages: createFakeSlugs(),
    'organization-name': faker.company.name(),
    address: faker.location.zipCode()
  };
}
