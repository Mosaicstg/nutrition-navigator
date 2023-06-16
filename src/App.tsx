import L, { MarkerCluster } from 'leaflet';
import config from './config';

// Components
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import MapFilters from './components/MapFilters.tsx';

// Hooks
import useAllPrograms from './hooks/useAllPrograms.tsx';

// CSS
import 'leaflet/dist/leaflet.css';
import './App.scss';

const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'nutrition-navigator__marker-cluster-icon',
    iconSize: L.point(33, 33, true)
  });
};

const createCustomMapPin = L.icon({
  iconUrl: './assets/map-pin.png',
  iconSize: new L.Point(30, 35)
});

const App = () => {
  const { state, dispatch } = useAllPrograms();
  const { filteredPrograms } = state;

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...{ state, dispatch }} />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 500 }}
        attributionControl={false}
      >
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
                <Popup className={'nutrition-navigator__marker-popup'}>
                  <div className={'nutrition-navigator__marker-content-wrap'}>
                    Hello World
                  </div>
                </Popup>
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
    </div>
  );
};

export default App;
