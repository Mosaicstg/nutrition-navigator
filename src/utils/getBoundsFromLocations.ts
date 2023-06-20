import L, { LatLngBounds } from 'leaflet';
import { ProgramSchema, Program } from '../schema.ts';

export const getBoundsFromLocations = (programs: Program[]): LatLngBounds => {
  const locations = programs.filter((program) => {
    const validatedProgram = ProgramSchema.safeParse(program);

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

  return L.geoJSON(geoJSON).getBounds();
};
