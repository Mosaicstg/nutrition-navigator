import { describe, it, expect } from 'vitest';
import { getGeoJSONFromPrograms } from '../get-geojson-from-programs.ts';

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
});
