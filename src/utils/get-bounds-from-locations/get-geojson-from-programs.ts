import * as v from 'valibot';
import { ProgramSchema } from '~/routes/use-filtered-programs';
import { type Program } from '~/routes/use-filtered-programs';

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
