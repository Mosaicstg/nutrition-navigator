import { describe, it, expect, expectTypeOf } from 'vitest';
import { getGeoJSONFromPrograms } from '../get-geojson-from-programs.ts';
import { createFakePrograms } from '../../../mocks/program.ts';

describe('Get Bounds From Locations', () => {
  it('returns empty features array', () => {
    const emptyGeoJSON = {
      features: [],
      type: 'FeatureCollection'
    };

    expect(getGeoJSONFromPrograms([])).toEqual(emptyGeoJSON);
  });

  it('returns empty features array with non-Program-like objects', () => {
    const emptyGeoJSON = {
      features: [],
      type: 'FeatureCollection'
    };

    expect(
      getGeoJSONFromPrograms([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { anything: 'string', everything: 'some other string' }
      ])
    ).toEqual(emptyGeoJSON);
  });

  it('return the correct number of features in GeoJSON object using Program objects', () => {
    const testPrograms = createFakePrograms();

    const geoJSON = getGeoJSONFromPrograms(testPrograms);

    // Check type
    expectTypeOf(geoJSON).toEqualTypeOf<GeoJSON.FeatureCollection>();

    // Check length of features
    expect(geoJSON.features).toHaveLength(testPrograms.length);
  });
});
