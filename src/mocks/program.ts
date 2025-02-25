import { type Program } from '~/routes/use-filtered-programs.tsx';
import { faker } from '@faker-js/faker';
import { createFakeLatitudeOrLatitude, createFakeSlugs } from './helpers.ts';

export function createFakeProgram(): Program {
  return {
    id: faker.number.int({ min: 1 }),
    'program-name': faker.company.name(),
    'organization-url': faker.internet.url(),
    'organization-name': faker.company.name(),
    url: faker.internet.url(),
    longitude: createFakeLatitudeOrLatitude(),
    latitude: createFakeLatitudeOrLatitude(),
    'program-types': createFakeSlugs(),
    venues: createFakeSlugs(),
    audiences: createFakeSlugs(),
    regions: createFakeSlugs(),
    languages: createFakeSlugs()
  };
}

export function createFakePrograms(): Array<Program> {
  return faker.helpers.multiple(() => createFakeProgram());
}
