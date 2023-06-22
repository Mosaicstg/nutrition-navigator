import { expect, describe, it } from 'vitest';
import { calculateDistanceBetweenPoints } from '../calculate-distance-between-points.ts';

describe('Calculate Distance Between Points', () => {
  it('returns zero', () => {
    const Point1 = { lat: 0, lng: 0 };
    const Point2 = { lat: 0, lng: 0 };

    expect(calculateDistanceBetweenPoints(Point1, Point2)).toBe(0);
  });

  it('returns zero miles using real location', () => {
    const Point1 = { lat: 40.75159487071783, lng: -73.98729897262922 };

    expect(calculateDistanceBetweenPoints(Point1, Point1)).toBe(0);
  });

  it('returns correct miles distance using real points', () => {
    const Point1 = { lat: 40.75159487071783, lng: -73.98729897262922 };
    const Point2 = { lat: 40.73093627475158, lng: -73.99605389618924 };

    expect(calculateDistanceBetweenPoints(Point1, Point2)).toBeCloseTo(1.5);
  });
});
