import { ProgramSchema } from '../../hooks/useAllPrograms/schema.ts';
import { Program } from '~/hooks/useAllPrograms/types.ts';
import * as v from 'valibot';

export const getGeoJSONFromPrograms = (programs: Program[]) => {
  const locations = programs.filter((program) => {
    const validatedProgram = v.safeParse(ProgramSchema, program);

    return validatedProgram.success;
  });

  const geoJSON: GeoJSON.FeatureCollection = {
    features: locations.map((location) => ({
      geometry: {
        coordinates: [location.longitude, location.latitude],
        type: 'Point'
      },
      properties: {
        locationId: location.id
      },
      type: 'Feature'
    })),
    type: 'FeatureCollection'
  };

  return geoJSON;
};
