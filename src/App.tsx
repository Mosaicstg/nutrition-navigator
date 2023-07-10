import L, { MarkerCluster } from 'leaflet';
import config from './config/index.ts';
import mapPinImage from './assets/map-pin.png';

// Components
import {
  MapContainer,
  MapContainerProps,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import MapFilters from './components/MapFilters.tsx';
import MarkerPopUp from './components/MarkerPopUp.tsx';

// Hooks
import useAllPrograms from './hooks/useAllPrograms/useAllPrograms.tsx';

// CSS
import 'leaflet/dist/leaflet.css';
import './App.scss';
import { getGeoJSONFromPrograms } from './utils/get-bounds-from-locations/get-geojson-from-programs.ts';
import Loading from './components/Loading.tsx';

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

const App = () => {
  const [state, dispatch] = useAllPrograms();
  const { filteredPrograms, programs } = state;

  const mapContainerProps: MapContainerProps = {
    zoom: 13,
    scrollWheelZoom: false,
    style: { height: 630 },
    attributionControl: false
  };

  const mapGeoJSON = filteredPrograms.length
    ? L.geoJson(getGeoJSONFromPrograms(filteredPrograms))
    : L.geoJson(getGeoJSONFromPrograms(programs));

  const mapBounds = mapGeoJSON.getBounds();

  if (mapBounds.isValid()) {
    mapContainerProps.bounds = mapBounds;
    mapContainerProps.center = mapBounds.getCenter();
  }

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...{ state, dispatch }} />
      {programs.length === 0 ? (
        <Loading />
      ) : (
        <MapContainer {...{ ...mapContainerProps }}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={config.mapBoxToken}
          />
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            chunkedLoading
          >
            {filteredPrograms?.map((program, index) => {
              return (
                <Marker
                  icon={createCustomMapPin}
                  key={index}
                  position={[program.latitude, program.longitude]}
                >
                  <MarkerPopUp program={program} />
                </Marker>
              );
            })}
            <Marker icon={createCustomMapPin} position={[51.505, -0.08]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker icon={createCustomMapPin} position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </div>
  );
};

export default App;
