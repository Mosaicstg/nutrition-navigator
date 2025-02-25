import { type Program } from '~/routes/use-filtered-programs';
import { faker } from '@faker-js/faker';

export type GetValueByKey<T, K extends keyof T> = K extends keyof T
  ? T[K]
  : never;

export function createFakeSlugs(): GetValueByKey<Program, 'program-types'> {
  return faker.helpers.multiple(() => faker.lorem.slug());
}

export function createFakeLatitudeOrLatitude():
  | GetValueByKey<Program, 'latitude'>
  | GetValueByKey<Program, 'longitude'> {
  return faker.number.float({ min: -99.99999999999, max: 99.9999999999 });
}

export function createFakeLatAndLongObject() {
  return {
    lat: createFakeLatitudeOrLatitude(),
    lng: createFakeLatitudeOrLatitude()
  };
}
