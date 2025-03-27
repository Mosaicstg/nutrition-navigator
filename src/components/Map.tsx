import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  useMap
} from 'react-leaflet';
import L, { MarkerCluster } from 'leaflet';
import config from '~/config';
import MarkerClusterGroup from 'react-leaflet-cluster';
import MarkerPopUp from './MarkerPopUp.tsx';
import { type Program } from '~/routes/schema';
import { getGeoJSONFromPrograms } from '~/utils/get-bounds-from-locations/get-geojson-from-programs.ts';
import mapPinImage from '~/assets/map-pin.png';
import mapPinNotOpenToPublic from '~/assets/map-pin-not-open-to-public.png';

type MapProps = {
  filteredLocations: Array<Program>;
  programs?: Array<Program>;
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
 * This Component is purely used to update map's bounds since prop/state updates
 * don't trigger map updates so the updates have to be done on the L.map object
 * within the React.useContext retrieved from `useMap()`
 *
 * @param props
 * @constructor
 */
function HandleMapUpdates(props: MapProps) {
  const { filteredLocations } = props;
  const map = useMap();

  const mapGeoJSON = L.geoJson(getGeoJSONFromPrograms(filteredLocations));
  const mapBounds = mapGeoJSON.getBounds();

  if (mapBounds.isValid()) {
    map.fitBounds(mapBounds);
  }

  return null;
}

const Map = (props: MapProps) => {
  const { filteredLocations, programs } = props;

  const mapContainerProps: MapContainerProps = {
    scrollWheelZoom: false,
    style: { height: 650 },
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
    <MapContainer {...mapContainerProps}>
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}"
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
      <HandleMapUpdates filteredLocations={filteredLocations} />
    </MapContainer>
  );
};

export default Map;
