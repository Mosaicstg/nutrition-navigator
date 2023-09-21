import { Program } from '../hooks/useAllPrograms/types.ts';
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
    'metro-areas': createFakeSlugs(),
    languages: createFakeSlugs()
  };
}

export function createFakePrograms(): Program[] {
  return faker.helpers.multiple(() => createFakeProgram());
}
