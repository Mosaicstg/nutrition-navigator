import * as v from 'valibot';

const PointSchema = v.object({
  lat: v.number(),
  lng: v.number()
});

type Point = v.InferOutput<typeof PointSchema>;

/**
 * Calculates distance in miles between point A and point B
 *
 * @param {object} point1 lat,lng of point A
 * @param {object} point2 lat,lng of point B
 *
 * @returns {number} Distance in miles
 */
export const calculateDistanceBetweenPoints = (
  point1: Point,
  point2: Point
): number => {
  const { lat: lat1, lng: lng1 } = point1;
  const { lat: lat2, lng: lng2 } = point2;

  if (lat1 === lat2 && lng1 === lng2) {
    return 0;
  } else {
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lng1 - lng2;
    const radTheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    return dist;
  }
};
