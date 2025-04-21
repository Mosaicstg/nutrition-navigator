import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  useMap
} from 'react-leaflet';
import L, {
  // @ts-expect-error We need to resolve why the Type isn't being properly imported
  MarkerCluster
} from 'leaflet';
import config from '~/config';
import MarkerClusterGroup from 'react-leaflet-cluster';
import MarkerPopUp from './MarkerPopUp.tsx';
import { type Program } from '~/routes/schema';
import { getGeoJSONFromPrograms } from '~/utils/get-bounds-from-locations/get-geojson-from-programs.ts';
import mapPinImage from '~/assets/map-pin.png';
import mapPinNotOpenToPublic from '~/assets/map-pin-not-open-to-public.png';
import React from 'react';

type MapProps = {
  filteredLocations: Array<Program>;
  filtersOpen: boolean;
  programs?: Array<Program>;
  tileLayerHash?: number;
};

const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'nutrition-navigator__marker-cluster-icon',
    iconSize: L.point(33, 33, true)
  });
};

const createCustomMapPin = L.icon({
  iconUrl: mapPinImage,
  iconSize: new L.Point(30, 35)
});

const customPinForNotOpenToPublic = L.icon({
  iconUrl: mapPinNotOpenToPublic,
  iconSize: new L.Point(30, 35)
});

/**
 * NOTE: There are instances where the map doesn't update when the filters are closed on desktop
 *  This happens when:
 *    1. The user is in desktop view
 *    2. The page loads with the filters already open
 *    3. Gray boxes appear in the tile layer of the map
 * This hook is used to force the map to refresh the tiles when the filters are toggled open/closed
 */
function useRefreshMapTiles(
  map: L.Map,
  refresh: boolean,
  tileLayerHash: number
) {
  const root = document.querySelector(':root')!;
  const rootStyles = getComputedStyle(root);
  const mapTransitionTiming = +rootStyles
    .getPropertyValue('--nutrition-navigator-map-transition')
    .replaceAll('ms', '');

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
      console.log('map is updating');
    }, mapTransitionTiming);

    return () => {
      clearTimeout(timeout);
    };
  }, [map, tileLayerHash, mapTransitionTiming]);
}

/**
 * This Component is purely used to update map's bounds since prop/state updates
 * don't trigger map updates so the updates have to be done on the L.map object
 * within the React.useContext retrieved from `useMap()`
 *
 * @param props
 * @constructor
 */
function HandleMapUpdates({
  filteredLocations,
  filtersOpen,
  tileLayerHash
}: MapProps) {
  const map = useMap();

  const mapGeoJSON = L.geoJson(getGeoJSONFromPrograms(filteredLocations));
  const mapBounds = mapGeoJSON.getBounds();

  if (mapBounds.isValid()) {
    map.fitBounds(mapBounds);
  }

  useRefreshMapTiles(map, filtersOpen, tileLayerHash ?? 0);

  return null;
}

// function CustomTileLayer({
//   url,
//   accessToken
// }: TileLayerProps & { refresh?: boolean; accessToken: string }) {
//   const map = useMap();
//   const tileLayerRef = React.useRef<L.TileLayer>(null);
//   const root = document.querySelector(':root')!;
//   const rootStyles = getComputedStyle(root);
//   const mapTransitionTiming = +rootStyles
//     .getPropertyValue('--nutrition-navigator-map-transition')
//     .replaceAll('ms', '');
//
//   React.useEffect(() => {
//     let timeout;
//
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//
//     if (tileLayerRef.current) {
//       timeout = setTimeout(() => {
//         tileLayerRef?.current?.setUrl(url, true);
//         map.invalidateSize();
//       }, mapTransitionTiming);
//     } else {
//       tileLayerRef.current = L.tileLayer(url, {
//         // @ts-expect-error This is supported by not picked up by the Types of this component
//         accessToken
//       });
//       tileLayerRef.current.addTo(map);
//     }
//
//     return () => {
//       if (timeout) {
//         clearTimeout(timeout);
//       }
//     };
//   }, [url, accessToken, map, tileLayerRef, mapTransitionTiming]);
//
//   return null;
// }
//

const Map = ({
  filteredLocations,
  programs,
  filtersOpen,
  tileLayerHash
}: MapProps) => {
  const mapContainerProps: MapContainerProps = {
    scrollWheelZoom: false,
    // style: { height: 700 },
    attributionControl: false,
    maxZoom: 15,
    id: 'map-container'
  };

  const mapGeoJSON = L.geoJson(
    getGeoJSONFromPrograms(programs?.length ? programs : filteredLocations)
  );

  const mapBounds = mapGeoJSON.getBounds();

  if (mapBounds.isValid()) {
    mapContainerProps.bounds = mapBounds;
    mapContainerProps.center = mapBounds.getCenter();
  }

  return (
    <MapContainer
      {...mapContainerProps}
      className="nutrition-navigator__map-container"
      zoomControl={false}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}`}
        // url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}&hash=${tileLayerHash}`}
        // @ts-expect-error This is supported by not picked up by the Types of this component
        accessToken={config.mapBoxToken}
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        chunkedLoading
      >
        {filteredLocations?.map((program, index) => {
          return (
            <Marker
              icon={
                program['not-open-to-public']
                  ? customPinForNotOpenToPublic
                  : createCustomMapPin
              }
              key={index}
              position={[program.latitude, program.longitude]}
            >
              <MarkerPopUp program={program} />
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      <HandleMapUpdates
        filteredLocations={filteredLocations}
        filtersOpen={filtersOpen}
        tileLayerHash={tileLayerHash}
      />
    </MapContainer>
  );
};

export default Map;
