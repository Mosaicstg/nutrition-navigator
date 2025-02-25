import { type MapFilters } from '~/routes/schema';
import { createFakeSlugs } from './helpers.ts';
import { faker } from '@faker-js/faker';

export function createFakeMapFilters(): MapFilters {
  return {
    'program-types': createFakeSlugs(),
    regions: createFakeSlugs(),
    venues: createFakeSlugs(),
    audiences: createFakeSlugs(),
    languages: createFakeSlugs(),
    'organization-name': faker.company.name(),
    address: faker.location.zipCode()
  };
}
