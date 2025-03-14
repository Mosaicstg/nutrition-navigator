import * as v from 'valibot';
import { ProgramSchema } from '~/routes/schema';
import { type Program } from '~/routes/schema';

export const getGeoJSONFromPrograms = (programs: Array<Program>) => {
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
