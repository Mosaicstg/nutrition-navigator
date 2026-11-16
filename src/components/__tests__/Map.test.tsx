import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import '~/index.scss';
import Map from '~/components/Map.tsx';
import { createFakeProgram } from '~/mocks/program.ts';

// Real coordinates so the map fits to a sensible zoom level (Philadelphia + D.C.)
const programs = [
  { ...createFakeProgram(), latitude: 39.9526, longitude: -75.1652 },
  { ...createFakeProgram(), latitude: 38.9072, longitude: -77.0369 }
];

function renderMap() {
  return render(
    <div id="nutrition-navigator">
      {/* Marker popups query program types */}
      <QueryClientProvider client={new QueryClient()}>
        <div className="nutrition-navigator__map">
          <Map
            filteredLocations={programs}
            programs={programs}
            filtersOpen={false}
            tileLayerHash={0}
          />
        </div>
      </QueryClientProvider>
    </div>
  );
}

/**
 * Leaflet keeps its "proxy" element scaled to 2^(zoom - 1) after every zoom,
 * which lets us read the current zoom level without a ref to the map instance.
 */
function getMapZoom(container: HTMLElement) {
  const proxy = container.querySelector<HTMLElement>('.leaflet-proxy');
  const scale = proxy?.style.transform.match(/scale\(([\d.]+)\)/)?.[1];

  return scale ? Math.log2(Number(scale)) + 1 : NaN;
}

// Leaflet ignores zoom clicks while a zoom animation is still running
function isZoomAnimating(container: HTMLElement) {
  return container.querySelector('.leaflet-zoom-anim') !== null;
}

describe('Map zoom controls', () => {
  test('renders zoom buttons in the top right corner', async () => {
    const screen = renderMap();

    const zoomIn = screen.getByRole('button', { name: 'Zoom in' });
    const zoomOut = screen.getByRole('button', { name: 'Zoom out' });

    await expect.element(zoomIn).toBeVisible();
    await expect.element(zoomOut).toBeVisible();

    // Must stay out of the top left corner, where the floating filters toggle sits
    expect(
      zoomIn.element().closest('.leaflet-top.leaflet-right')
    ).not.toBeNull();
    expect(
      screen.container.querySelector('.leaflet-left .leaflet-control-zoom')
    ).toBeNull();
  });

  test('zoom buttons change the map zoom level', async () => {
    const screen = renderMap();

    await expect.poll(() => getMapZoom(screen.container)).not.toBeNaN();

    const startZoom = getMapZoom(screen.container);

    await screen.getByRole('button', { name: 'Zoom in' }).click();

    await expect.poll(() => getMapZoom(screen.container)).toBe(startZoom + 1);
    await expect.poll(() => isZoomAnimating(screen.container)).toBe(false);

    await screen.getByRole('button', { name: 'Zoom out' }).click();

    await expect.poll(() => getMapZoom(screen.container)).toBe(startZoom);
  });
});
